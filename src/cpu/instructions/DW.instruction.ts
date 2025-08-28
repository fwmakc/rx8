import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class DW extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 36,
      id: 'DW',
      name: 'DW',
      mask: 0x0000,
      pattern: 0x0000,
      arguments: [{ mask: 0xffff, shift: 0, type: 'DW' }],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Data word
    cpu.halted = true;
    throw new Error(`Illegal instruction: ${JSON.stringify(args)}`);
  }
}

export default new DW();
