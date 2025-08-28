import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class SUBN_VX_VY extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 18,
      id: 'SUBN_VX_VY',
      name: 'SUBN',
      mask: 0xf00f,
      pattern: 0x8007,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 8xy7 - Set Vx = Vy - Vx, set VF = NOT borrow
    cpu.registers[0xf] =
      cpu.registers[args[1]] > cpu.registers[args[0]] ? 1 : 0;

    cpu.registers[args[0]] = cpu.registers[args[1]] - cpu.registers[args[0]];
    cpu._nextInstruction();
  }
}

export default new SUBN_VX_VY();
