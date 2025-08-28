import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class OR_VX_VY extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 12,
      id: 'OR_VX_VY',
      name: 'OR',
      mask: 0xf00f,
      pattern: 0x8001,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 8xy1 - Set Vx = Vx OR Vy
    cpu.registers[args[0]] |= cpu.registers[args[1]];
    cpu._nextInstruction();
  }
}

export default new OR_VX_VY();
