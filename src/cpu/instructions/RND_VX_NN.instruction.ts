import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class RND_VX_NN extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 23,
      id: 'RND_VX_NN',
      name: 'RND',
      mask: 0xf000,
      pattern: 0xc000,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00ff, shift: 0, type: 'NN' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Cxnn - Set Vx = random byte AND nn
    // eslint-disable-next-line no-case-declarations
    const random = Math.floor(Math.random() * 0xff);
    cpu.registers[args[0]] = random & args[1];
    cpu._nextInstruction();
  }
}

export default new RND_VX_NN();
