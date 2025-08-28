import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_I_ADDR extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 21,
      id: 'LD_I_ADDR',
      name: 'LD',
      mask: 0xf000,
      pattern: 0xa000,
      arguments: [
        { mask: 0x0000, shift: 0, type: 'I' },
        { mask: 0x0fff, shift: 0, type: 'A' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Annn - Set I = nnn
    cpu.I = args[1];
    cpu._nextInstruction();
  }
}

export default new LD_I_ADDR();
