import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_VX_NN extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 9,
      id: 'LD_VX_NN',
      name: 'LD',
      mask: 0xf000,
      pattern: 0x6000,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00ff, shift: 0, type: 'NN' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 6xnn - Set Vx = nn
    cpu.registers[args[0]] = args[1];
    cpu._nextInstruction();
  }
}

export default new LD_VX_NN();
