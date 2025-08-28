import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class AND_VX_VY extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 13,
      id: 'AND_VX_VY',
      name: 'AND',
      mask: 0xf00f,
      pattern: 0x8002,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 8xy2 - Set Vx = Vx AND Vy
    cpu.registers[args[0]] &= cpu.registers[args[1]];
    cpu._nextInstruction();
  }
}

export default new AND_VX_VY();
