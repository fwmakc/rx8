import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class SKP_VX extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 25,
      id: 'SKP_VX',
      name: 'SKP',
      mask: 0xf0ff,
      pattern: 0xe09e,
      arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Ex9E - Skip next instruction if key with the value of Vx is pressed
    if (cpu.interface.getKeys() & (1 << cpu.registers[args[0]])) {
      cpu._skipInstruction();
    } else {
      cpu._nextInstruction();
    }
  }
}

export default new SKP_VX();
