import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class XOR_VX_VY extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 14,
      id: 'XOR_VX_VY',
      name: 'XOR',
      mask: 0xf00f,
      pattern: 0x8003,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 8xy3 - Set Vx = Vx XOR Vy
    cpu.registers[args[0]] ^= cpu.registers[args[1]];
    cpu._nextInstruction();
  }
}

export default new XOR_VX_VY();
