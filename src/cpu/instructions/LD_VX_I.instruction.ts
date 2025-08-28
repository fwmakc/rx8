import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_VX_I extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 35,
      id: 'LD_VX_I',
      name: 'LD',
      mask: 0xf0ff,
      pattern: 0xf065,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x0000, shift: 0, type: '[I]' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Fx65 - Read registers V0 through Vx from memory starting at location I
    if (cpu.I > 4095 - args[0]) {
      cpu.halted = true;
      throw new Error('Memory out of bounds.');
    }

    for (let i = 0; i <= args[0]; i++) {
      cpu.registers[i] = cpu.memory[cpu.I + i];
    }

    cpu._nextInstruction();
  }
}

export default new LD_VX_I();
