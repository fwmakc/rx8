import { decode } from './cycle/decode.cycle';
import { execute } from './cycle/execute.cycle';
import { fetch } from './cycle/fetch.cycle';
import { ICpu } from './interfaces/cpu.interface';
import { FONT_SET } from './interfaces/data/fontSet';

export class CPU {
  halted = true;
  soundEnabled = false;

  interface: ICpu;

  memory: any;
  registers: any;
  stack: any;
  ST: any;
  DT: any;
  I: any;
  SP: any;
  PC: any;

  constructor(cpuInterface: ICpu) {
    this.interface = cpuInterface;
    this.reset();
  }

  /**
   * Set or reset the state to initial values.
   *
   * Memory - 4kb (4096 bytes) memory storage (8-bit)
   * Registers - (16 * 8-bit) V0 through VF; VF is a flag
   * Stack - (16 * 16-bit)
   * ST - Sound Timer (8-bit)
   * DT - Delay Timer (8-bit)
   * I - stores memory addresses
   * SP - Stack Pointer (8-bit) points at topost level of stack
   * PC - Program Counter (8-bit) stores currently executing address
   */
  reset() {
    /**
     * Память
     * Chip-8 может получить доступ к 4 Кб памяти ОЗУ. Это 0,002% от объёма памяти на дискете. Большая часть данных процессора хранится в памяти.
     * 4 Кb — это 4096 байт, и JavaScript поддерживает полезные типизированные массивы, к примеру, Uint8Array с фиксированным размером элементов — здесь это 8 бит.
     */
    this.memory = new Uint8Array(4096);

    /**
     * Счётчик команд (PC)
     * Этот счётчик хранит адрес текущей инструкции в виде 16-битного целого числа. Каждая инструкция в Chip-8 обновляет PC, когда она завершена, чтобы перейти к следующей инструкции, обращаясь к инструкции по адресу, который записан в PC.
     * Что касается схемы размещения ячеек памяти Chip-8, 0x000 to 0x1FF зарезервировано, так что память начинается с адреса 0x200.
     * Вы заметите, что массив памяти 8-битный, а PC — 16-битное целое число, поэтому, чтобы получился опкод big endian, объединяются два программных кода.
     */
    this.PC = 0x200;

    /**
     * Регистры
     * Память обычно используется для долгосрочного хранения и программирования данных, поэтому регистры существуют как своего рода «кратковременная память» для немедленного получения данных и вычислений. Chip-8 имеет 16 8-битных регистров, от V0 до VF.
     */
    this.registers = new Uint8Array(16);

    /**
     * Индексный регистр
     * Существует специальный 16-битный регистр, который обращается к определённой точке в памяти, так называемый I. Регистр I существует в основном для чтения и записи в память, поскольку адресуемая память также 16-битная.
     */
    this.I = 0;

    /**
     * Стек
     * Chip-8 имеет возможность переходить в подпрограммы, а также в стек для отслеживания того, куда возвращаться. Стек имеет размер 16 16-битных значений: до «переполнение стека» программа может перейти в 16 вложенных подпрограмм.
     */
    this.stack = new Uint16Array(16);

    /**
     * Указатель стека
     * Указатель стека (SP) — это 8-битное целое число, которое указывает на место в стеке. Он должен быть только 8-битным, хотя стек 16-битный. Поскольку указатель ссылается только на индекс стека, он должен иметь значения только от 0 до 15.
     */
    this.SP = -1;

    /**
     * Таймеры
     * Chip-8 способен издавать великолепный одиночный звуковой сигнал. Честно говоря, я не потрудилась реализовать реальный вывод «музыки», хотя сам процессор может с ней работать.
     * Есть два таймера, оба — 8-битные регистры: звуковой таймер (ST) для определения времени звукового сигнала и таймер задержки (DT) для определения времени некоторых событий в игре. Они отсчитывают время с частотой 60 Гц.
     */
    this.DT = 0;
    this.ST = 0;

    this.halted = true;
    this.soundEnabled = false;
  }

  // Шаг по инструкциям
  step() {
    // проверяем, остановлен ли процессор
    if (this.halted) {
      throw new Error(
        'A problem has been detected and Chip-8 has been shut down to prevent damage to your computer.',
      );
    }

    // 1й шаг, fetch, обращается к текущему опкоду из памяти
    console.log('-- fetch...', {
      memory: this.memory,
      PC: this.PC,
    });
    const opcode = fetch(this);

    // 2й шаг, decode разберёт опкод на понятный набор команд
    console.log('-- decode... opcode', opcode);
    const instruction = decode(opcode);

    // 3й шаг, выполняем инструкцию
    console.log('-- execute... instruction', instruction);
    execute(instruction, this);
  }

  load(romBuffer: any) {
    // Reset the CPU every time it is loaded
    this.reset();

    // 0-80 in memory is reserved for font set
    for (let i = 0; i < FONT_SET.length; i++) {
      this.memory[i] = FONT_SET[i];
    }

    // Get ROM data from ROM buffer
    const romData = romBuffer.data;
    const memoryStart = 0x200;

    this.halted = false;

    // Place ROM data in memory starting at 0x200
    // Since memory is stored in an 8-bit array and opcodes are 16-bit, we have
    // to store the opcodes across two indices in memory
    for (let i = 0; i < romData.length; i++) {
      // set the first index with the most significant byte (i.e., 0x1234 would be 0x12)
      this.memory[memoryStart + 2 * i] = romData[i] >> 8;
      // set the second index with the least significant byte (i.e., 0x1234 would be 0x34)
      this.memory[memoryStart + 2 * i + 1] = romData[i] & 0x00ff;
    }
  }

  tick() {
    if (this.DT > 0) {
      // Decrement the delay timer by one until it reaches zero
      this.DT--;
    }

    if (this.ST > 0) {
      // The sound timer is active whenever the sound timer register (ST) is non-zero.
      this.ST--;
    } else {
      // When ST reaches zero, the sound timer deactivates.
      if (this.soundEnabled) {
        this.interface.disableSound();
        this.soundEnabled = false;
      }
    }
  }

  _nextInstruction() {
    // Move forward two bytes
    this.PC = this.PC + 2;
  }

  _skipInstruction() {
    // Move forward four bytes
    this.PC = this.PC + 4;
  }
}
