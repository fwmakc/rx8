import { CPU } from '../cpu';
import { IDisassembled } from '../instructions/interfaces/disassembled.interface';
import { InstructionTemplate } from '../instructions/templates/instruction.template';
import * as instructions from '../instructions';

export function execute(instruction: IDisassembled, cpu: CPU) {
  const { id, args } = instruction;

  // Получите соответствующую инструкцию
  const instr: any = instructions;
  const current: InstructionTemplate | undefined = instr[id];

  // Убедитесь, что инструкция существует перед вызовом
  if (!current) {
    cpu.halted = true;
    throw new Error(`Unknown instruction: ${id}`);
  }

  current.execute(cpu, args);
}
