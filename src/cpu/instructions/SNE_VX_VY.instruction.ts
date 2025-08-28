import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class SNE_VX_VY extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 20,
      id: 'SNE_VX_VY',
      name: 'SNE',
      mask: 0xf00f,
      pattern: 0x9000,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 9xy0 - Skip next instruction if Vx != Vy
    if (cpu.registers[args[0]] !== cpu.registers[args[1]]) {
      cpu._skipInstruction();
    } else {
      cpu._nextInstruction();
    }
  }
}

export default new SNE_VX_VY();
