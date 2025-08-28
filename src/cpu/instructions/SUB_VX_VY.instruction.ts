import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class SUB_VX_VY extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 16,
      id: 'SUB_VX_VY',
      name: 'SUB',
      mask: 0xf00f,
      pattern: 0x8005,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 8xy5 - Set Vx = Vx - Vy, set VF = NOT borrow
    cpu.registers[0xf] =
      cpu.registers[args[0]] > cpu.registers[args[1]] ? 1 : 0;
    cpu.registers[args[0]] -= cpu.registers[args[1]];

    cpu._nextInstruction();
  }
}

export default new SUB_VX_VY();
