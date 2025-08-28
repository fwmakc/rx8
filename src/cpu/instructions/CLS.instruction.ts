import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class CLS extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 2,
      id: 'CLS',
      name: 'CLS',
      mask: 0xffff,
      pattern: 0x00e0,
      arguments: [],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 00E0 - Clear the display
    cpu.interface.clearDisplay();
    cpu._nextInstruction();
  }
}

export default new CLS();
