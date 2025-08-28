import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class SHR_VX_VY extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 17,
      id: 'SHR_VX_VY',
      name: 'SHR',
      mask: 0xf00f,
      pattern: 0x8006,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 8xy6 - Set Vx = Vx SHR 1
    cpu.registers[0xf] = cpu.registers[args[0]] & 1;
    cpu.registers[args[0]] >>= 1;
    cpu._nextInstruction();
  }
}

export default new SHR_VX_VY();
