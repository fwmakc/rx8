import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class JP_ADDR extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 4,
      id: 'JP_ADDR',
      name: 'JP',
      mask: 0xf000,
      pattern: 0x1000,
      arguments: [{ mask: 0x0fff, shift: 0, type: 'A' }],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 1nnn - Jump to location nnn
    cpu.PC = args[0];
  }
}

export default new JP_ADDR();
