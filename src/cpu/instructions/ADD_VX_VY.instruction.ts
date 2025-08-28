import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class ADD_VX_VY extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 15,
      id: 'ADD_VX_VY',
      name: 'ADD',
      mask: 0xf00f,
      pattern: 0x8004,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 8xy4 - Set Vx = Vx + Vy, set VF = carry
    cpu.registers[0xf] =
      cpu.registers[args[0]] + cpu.registers[args[1]] > 0xff ? 1 : 0;
    cpu.registers[args[0]] += cpu.registers[args[1]];

    cpu._nextInstruction();
  }
}

export default new ADD_VX_VY();
