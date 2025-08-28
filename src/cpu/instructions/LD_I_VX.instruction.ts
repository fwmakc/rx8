import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_I_VX extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 34,
      id: 'LD_I_VX',
      name: 'LD',
      mask: 0xf0ff,
      pattern: 0xf055,
      arguments: [
        { mask: 0x0000, shift: 0, type: '[I]' },
        { mask: 0x0f00, shift: 8, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Fx55 - Store registers V0 through Vx in memory starting at location I
    if (cpu.I > 4095 - args[1]) {
      cpu.halted = true;
      throw new Error('Memory out of bounds.');
    }

    for (let i = 0; i <= args[1]; i++) {
      cpu.memory[cpu.I + i] = cpu.registers[i];
    }

    cpu._nextInstruction();
  }
}

export default new LD_I_VX();
