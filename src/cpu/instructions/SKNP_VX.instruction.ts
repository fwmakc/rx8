import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class SKNP_VX extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 26,
      id: 'SKNP_VX',
      name: 'SKNP',
      mask: 0xf0ff,
      pattern: 0xe0a1,
      arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // ExA1 - Skip next instruction if key with the value of Vx is not pressed
    if (!(cpu.interface.getKeys() & (1 << cpu.registers[args[0]]))) {
      cpu._skipInstruction();
    } else {
      cpu._nextInstruction();
    }
  }
}

export default new SKNP_VX();
