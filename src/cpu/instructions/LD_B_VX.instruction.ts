import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_B_VX extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 33,
      id: 'LD_B_VX',
      name: 'LD',
      mask: 0xf0ff,
      pattern: 0xf033,
      arguments: [
        { mask: 0x0000, shift: 0, type: 'B' },
        { mask: 0x0f00, shift: 8, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Fx33 - Store BCD representation of Vx in memory locations I, I+1, and I+2
    // BCD means binary-coded decimal
    // If VX is 0xef, or 239, we want 2, 3, and 9 in I, I+1, and I+2
    if (cpu.I > 4093) {
      cpu.halted = true;
      throw new Error('Memory out of bounds.');
    }

    // eslint-disable-next-line no-case-declarations
    let x = cpu.registers[args[1]];
    // eslint-disable-next-line no-case-declarations
    const a = Math.floor(x / 100); // for 239, a is 2
    x = x - a * 100; // subtract value of a * 100 from x (200)
    // eslint-disable-next-line no-case-declarations
    const b = Math.floor(x / 10); // x is now 39, b is 3
    x = x - b * 10; // subtract value of b * 10 from x (30)
    // eslint-disable-next-line no-case-declarations
    const c = Math.floor(x); // x is now 9

    cpu.memory[cpu.I] = a;
    cpu.memory[cpu.I + 1] = b;
    cpu.memory[cpu.I + 2] = c;

    cpu._nextInstruction();
  }
}

export default new LD_B_VX();
