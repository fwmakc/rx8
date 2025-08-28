import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class JP_V0_ADDR extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 22,
      id: 'JP_V0_ADDR',
      name: 'JP',
      mask: 0xf000,
      pattern: 0xb000,
      arguments: [
        { mask: 0x0000, shift: 0, type: 'V0' },
        { mask: 0x0fff, shift: 0, type: 'A' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Bnnn - Jump to location nnn + V0
    cpu.PC = cpu.registers[0] + args[1];
  }
}

export default new JP_V0_ADDR();
