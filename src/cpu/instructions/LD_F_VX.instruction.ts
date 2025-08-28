import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_F_VX extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 32,
      id: 'LD_F_VX',
      name: 'LD',
      mask: 0xf0ff,
      pattern: 0xf029,
      arguments: [
        { mask: 0x0000, shift: 0, type: 'I' },
        { mask: 0x0f00, shift: 8, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Fx29 - Set I = location of sprite for digit Vx
    if (cpu.registers[args[1]] > 0xf) {
      cpu.halted = true;
      throw new Error('Invalid digit.');
    }

    cpu.I = cpu.registers[args[1]] * 5;
    cpu._nextInstruction();
  }
}

export default new LD_F_VX();
