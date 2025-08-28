import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_ST_VX extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 30,
      id: 'LD_ST_VX',
      name: 'LD',
      mask: 0xf0ff,
      pattern: 0xf018,
      arguments: [
        { mask: 0x0000, shift: 0, type: 'ST' },
        { mask: 0x0f00, shift: 8, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Fx18 - Set sound timer = Vx
    cpu.ST = cpu.registers[args[1]];
    if (cpu.ST > 0) {
      cpu.soundEnabled = true;
      cpu.interface.enableSound();
    }
    cpu._nextInstruction();
  }
}

export default new LD_ST_VX();
