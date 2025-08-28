import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class SHL_VX_VY extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 19,
      id: 'SHL_VX_VY',
      name: 'SHL',
      mask: 0xf00f,
      pattern: 0x800e,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 8xyE - Set Vx = Vx SHL 1
    cpu.registers[0xf] = cpu.registers[args[0]] >> 7;

    cpu.registers[args[0]] <<= 1;
    cpu._nextInstruction();
  }
}

export default new SHL_VX_VY();
