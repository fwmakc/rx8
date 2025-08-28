import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class ADD_I_VX extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 31,
      id: 'ADD_I_VX',
      name: 'ADD',
      mask: 0xf0ff,
      pattern: 0xf01e,
      arguments: [
        { mask: 0x0000, shift: 0, type: 'I' },
        { mask: 0x0f00, shift: 8, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Fx1E - Set I = I + Vx
    cpu.I = cpu.I + cpu.registers[args[1]];
    cpu._nextInstruction();
  }
}

export default new ADD_I_VX();
