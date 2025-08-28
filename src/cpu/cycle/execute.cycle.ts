import { CPU } from '../cpu';
import { IDisassembled } from '../disassemble/disassembled.interface';
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from '../interfaces/data/constants';

export function execute(instruction: IDisassembled, cpu: CPU) {
  const { id, args } = instruction;

  switch (id) {
    case 'CLS':
      // 00E0 - Clear the display
      cpu.interface.clearDisplay();
      cpu._nextInstruction();
      break;

    case 'RET':
      // 00EE - Return from a subroutine
      if (cpu.SP === -1) {
        cpu.halted = true;
        throw new Error('Stack underflow.');
      }

      cpu.PC = cpu.stack[cpu.SP];
      cpu.SP--;
      break;

    case 'JP_ADDR':
      // 1nnn - Jump to location nnn
      cpu.PC = args[0];
      break;

    case 'CALL_ADDR':
      // 2nnn - Call subroutine at nnn
      if (cpu.SP === 15) {
        cpu.halted = true;
        throw new Error('Stack overflow.');
      }

      cpu.SP++;
      cpu.stack[cpu.SP] = cpu.PC + 2;
      cpu.PC = args[0];
      break;

    case 'SE_VX_NN':
      // 3xnn - Skip next instruction if Vx = nn
      if (cpu.registers[args[0]] === args[1]) {
        cpu._skipInstruction();
      } else {
        cpu._nextInstruction();
      }
      break;

    case 'SNE_VX_NN':
      // 4xnn - Skip next instruction if Vx != nn
      if (cpu.registers[args[0]] !== args[1]) {
        cpu._skipInstruction();
      } else {
        cpu._nextInstruction();
      }
      break;

    case 'SE_VX_VY':
      // 5xy0 - Skip next instruction if Vx = Vy
      if (cpu.registers[args[0]] === cpu.registers[args[1]]) {
        cpu._skipInstruction();
      } else {
        cpu._nextInstruction();
      }
      break;

    case 'LD_VX_NN':
      // 6xnn - Set Vx = nn
      cpu.registers[args[0]] = args[1];
      cpu._nextInstruction();
      break;

    case 'ADD_VX_NN':
      // 7xnn - Set Vx = Vx + nn
      // eslint-disable-next-line no-case-declarations
      let v = cpu.registers[args[0]] + args[1];
      if (v > 255) {
        v -= 256;
      }
      cpu.registers[args[0]] = v;
      cpu._nextInstruction();
      break;

    case 'LD_VX_VY':
      // 8xy0 - Set Vx = Vy
      cpu.registers[args[0]] = cpu.registers[args[1]];
      cpu._nextInstruction();
      break;

    case 'OR_VX_VY':
      // 8xy1 - Set Vx = Vx OR Vy
      cpu.registers[args[0]] |= cpu.registers[args[1]];
      cpu._nextInstruction();
      break;

    case 'AND_VX_VY':
      // 8xy2 - Set Vx = Vx AND Vy
      cpu.registers[args[0]] &= cpu.registers[args[1]];
      cpu._nextInstruction();
      break;

    case 'XOR_VX_VY':
      // 8xy3 - Set Vx = Vx XOR Vy
      cpu.registers[args[0]] ^= cpu.registers[args[1]];
      cpu._nextInstruction();
      break;

    case 'ADD_VX_VY':
      // 8xy4 - Set Vx = Vx + Vy, set VF = carry
      cpu.registers[0xf] =
        cpu.registers[args[0]] + cpu.registers[args[1]] > 0xff ? 1 : 0;
      cpu.registers[args[0]] += cpu.registers[args[1]];

      cpu._nextInstruction();
      break;

    case 'SUB_VX_VY':
      // 8xy5 - Set Vx = Vx - Vy, set VF = NOT borrow
      cpu.registers[0xf] =
        cpu.registers[args[0]] > cpu.registers[args[1]] ? 1 : 0;
      cpu.registers[args[0]] -= cpu.registers[args[1]];

      cpu._nextInstruction();
      break;

    case 'SHR_VX_VY':
      // 8xy6 - Set Vx = Vx SHR 1
      cpu.registers[0xf] = cpu.registers[args[0]] & 1;
      cpu.registers[args[0]] >>= 1;
      cpu._nextInstruction();
      break;

    case 'SUBN_VX_VY':
      // 8xy7 - Set Vx = Vy - Vx, set VF = NOT borrow
      cpu.registers[0xf] =
        cpu.registers[args[1]] > cpu.registers[args[0]] ? 1 : 0;

      cpu.registers[args[0]] = cpu.registers[args[1]] - cpu.registers[args[0]];
      cpu._nextInstruction();
      break;

    case 'SHL_VX_VY':
      // 8xyE - Set Vx = Vx SHL 1
      cpu.registers[0xf] = cpu.registers[args[0]] >> 7;

      cpu.registers[args[0]] <<= 1;
      cpu._nextInstruction();
      break;

    case 'SNE_VX_VY':
      // 9xy0 - Skip next instruction if Vx != Vy
      if (cpu.registers[args[0]] !== cpu.registers[args[1]]) {
        cpu._skipInstruction();
      } else {
        cpu._nextInstruction();
      }
      break;

    case 'LD_I_ADDR':
      // Annn - Set I = nnn
      cpu.I = args[1];
      cpu._nextInstruction();
      break;

    case 'JP_V0_ADDR':
      // Bnnn - Jump to location nnn + V0
      cpu.PC = cpu.registers[0] + args[1];
      break;

    case 'RND_VX_NN':
      // Cxnn - Set Vx = random byte AND nn
      // eslint-disable-next-line no-case-declarations
      const random = Math.floor(Math.random() * 0xff);
      cpu.registers[args[0]] = random & args[1];
      cpu._nextInstruction();
      break;

    case 'DRW_VX_VY_N':
      // Dxyn - Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision
      if (cpu.I > 4095 - args[2]) {
        cpu.halted = true;
        throw new Error('Memory out of bounds.');
      }

      // If no pixels are erased, set VF to 0
      cpu.registers[0xf] = 0;

      // The interpreter reads n bytes from memory, starting at the address stored in I
      for (let i = 0; i < args[2]; i++) {
        const line = cpu.memory[cpu.I + i];
        // Each byte is a line of eight pixels
        for (let position = 0; position < 8; position++) {
          // Get the byte to set by position
          const value = line & (1 << (7 - position)) ? 1 : 0;
          // If this causes any pixels to be erased, VF is set to 1
          const x = (cpu.registers[args[0]] + position) % DISPLAY_WIDTH; // wrap around width
          const y = (cpu.registers[args[1]] + i) % DISPLAY_HEIGHT; // wrap around height

          if (cpu.interface.drawPixel(x, y, value)) {
            cpu.registers[0xf] = 1;
          }
        }
      }

      cpu._nextInstruction();
      break;

    case 'SKP_VX':
      // Ex9E - Skip next instruction if key with the value of Vx is pressed
      if (cpu.interface.getKeys() & (1 << cpu.registers[args[0]])) {
        cpu._skipInstruction();
      } else {
        cpu._nextInstruction();
      }
      break;

    case 'SKNP_VX':
      // ExA1 - Skip next instruction if key with the value of Vx is not pressed
      if (!(cpu.interface.getKeys() & (1 << cpu.registers[args[0]]))) {
        cpu._skipInstruction();
      } else {
        cpu._nextInstruction();
      }
      break;

    case 'LD_VX_DT':
      // Fx07 - Set Vx = delay timer value
      cpu.registers[args[0]] = cpu.DT;
      cpu._nextInstruction();
      break;

    case 'LD_VX_N':
      // Fx0A - Wait for a key press, store the value of the key in Vx
      // eslint-disable-next-line no-case-declarations
      const keyPress = cpu.interface.waitKey();

      if (!keyPress) {
        return;
      }

      cpu.registers[args[0]] = keyPress;
      cpu._nextInstruction();
      break;

    case 'LD_DT_VX':
      // Fx15 - Set delay timer = Vx
      cpu.DT = cpu.registers[args[1]];
      cpu._nextInstruction();
      break;

    case 'LD_ST_VX':
      // Fx18 - Set sound timer = Vx
      cpu.ST = cpu.registers[args[1]];
      if (cpu.ST > 0) {
        cpu.soundEnabled = true;
        cpu.interface.enableSound();
      }
      cpu._nextInstruction();
      break;

    case 'ADD_I_VX':
      // Fx1E - Set I = I + Vx
      cpu.I = cpu.I + cpu.registers[args[1]];
      cpu._nextInstruction();
      break;

    case 'LD_F_VX':
      // Fx29 - Set I = location of sprite for digit Vx
      if (cpu.registers[args[1]] > 0xf) {
        cpu.halted = true;
        throw new Error('Invalid digit.');
      }

      cpu.I = cpu.registers[args[1]] * 5;
      cpu._nextInstruction();
      break;

    case 'LD_B_VX':
      // Fx33 - Store BCD representation of Vx in memory locations I, I+1, and I+2
      // BCD means binary-coded decimal
      // If VX is 0xef, or 239, we want 2, 3, and 9 in I, I+1, and I+2
      if (cpu.I > 4093) {
        cpu.halted = true;
        throw new Error('Memory out of bounds.');
      }

      // eslint-disable-next-line no-case-declarations
      let x = cpu.registers[args[1]];
      // eslint-disable-next-line no-case-declarations
      const a = Math.floor(x / 100); // for 239, a is 2
      x = x - a * 100; // subtract value of a * 100 from x (200)
      // eslint-disable-next-line no-case-declarations
      const b = Math.floor(x / 10); // x is now 39, b is 3
      x = x - b * 10; // subtract value of b * 10 from x (30)
      // eslint-disable-next-line no-case-declarations
      const c = Math.floor(x); // x is now 9

      cpu.memory[cpu.I] = a;
      cpu.memory[cpu.I + 1] = b;
      cpu.memory[cpu.I + 2] = c;

      cpu._nextInstruction();
      break;

    case 'LD_I_VX':
      // Fx55 - Store registers V0 through Vx in memory starting at location I
      if (cpu.I > 4095 - args[1]) {
        cpu.halted = true;
        throw new Error('Memory out of bounds.');
      }

      for (let i = 0; i <= args[1]; i++) {
        cpu.memory[cpu.I + i] = cpu.registers[i];
      }

      cpu._nextInstruction();
      break;

    case 'LD_VX_I':
      // Fx65 - Read registers V0 through Vx from memory starting at location I
      if (cpu.I > 4095 - args[0]) {
        cpu.halted = true;
        throw new Error('Memory out of bounds.');
      }

      for (let i = 0; i <= args[0]; i++) {
        cpu.registers[i] = cpu.memory[cpu.I + i];
      }

      cpu._nextInstruction();
      break;

    default:
      // Data word
      cpu.halted = true;
      throw new Error(`Illegal instruction: ${JSON.stringify(instruction)}`);
  }
}
