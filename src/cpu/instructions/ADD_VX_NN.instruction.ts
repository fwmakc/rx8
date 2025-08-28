import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class ADD_VX_NN extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 10,
      id: 'ADD_VX_NN',
      name: 'ADD',
      mask: 0xf000,
      pattern: 0x7000,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00ff, shift: 0, type: 'NN' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 7xnn - Set Vx = Vx + nn
    // eslint-disable-next-line no-case-declarations
    let v = cpu.registers[args[0]] + args[1];
    if (v > 255) {
      v -= 256;
    }
    cpu.registers[args[0]] = v;
    cpu._nextInstruction();
  }
}

export default new ADD_VX_NN();
