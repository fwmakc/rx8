import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_VX_DT extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 27,
      id: 'LD_VX_DT',
      name: 'LD',
      mask: 0xf00f,
      pattern: 0xf007,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x0000, shift: 0, type: 'DT' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Fx07 - Set Vx = delay timer value
    cpu.registers[args[0]] = cpu.DT;
    cpu._nextInstruction();
  }
}

export default new LD_VX_DT();
