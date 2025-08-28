import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_DT_VX extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 29,
      id: 'LD_DT_VX',
      name: 'LD',
      mask: 0xf0ff,
      pattern: 0xf015,
      arguments: [
        { mask: 0x0000, shift: 0, type: 'DT' },
        { mask: 0x0f00, shift: 8, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Fx15 - Set delay timer = Vx
    cpu.DT = cpu.registers[args[1]];
    cpu._nextInstruction();
  }
}

export default new LD_DT_VX();
