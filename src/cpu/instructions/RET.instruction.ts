import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class RET extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 3,
      id: 'RET',
      name: 'RET',
      mask: 0xffff,
      pattern: 0x00ee,
      arguments: [],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 00EE - Return from a subroutine
    if (cpu.SP === -1) {
      cpu.halted = true;
      throw new Error('Stack underflow.');
    }

    cpu.PC = cpu.stack[cpu.SP];
    cpu.SP--;
  }
}

export default new RET();
