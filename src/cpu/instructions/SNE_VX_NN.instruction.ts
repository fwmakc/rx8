import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class SNE_VX_NN extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 7,
      id: 'SNE_VX_NN',
      name: 'SNE',
      mask: 0xf000,
      pattern: 0x4000,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00ff, shift: 0, type: 'NN' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 4xnn - Skip next instruction if Vx != nn
    if (cpu.registers[args[0]] !== args[1]) {
      cpu._skipInstruction();
    } else {
      cpu._nextInstruction();
    }
  }
}

export default new SNE_VX_NN();
