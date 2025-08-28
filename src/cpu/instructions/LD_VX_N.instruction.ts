import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class LD_VX_N extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 28,
      id: 'LD_VX_N',
      name: 'LD',
      mask: 0xf00f,
      pattern: 0xf00a,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x0000, shift: 0, type: 'K' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Fx0A - Wait for a key press, store the value of the key in Vx
    // eslint-disable-next-line no-case-declarations
    const keyPress = cpu.interface.waitKey();

    if (!keyPress) {
      return;
    }

    cpu.registers[args[0]] = keyPress;
    cpu._nextInstruction();
  }
}

export default new LD_VX_N();
