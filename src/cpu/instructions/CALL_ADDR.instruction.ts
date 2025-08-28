import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';

class CALL_ADDR extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 5,
      id: 'CALL_ADDR',
      name: 'CALL',
      mask: 0xf000,
      pattern: 0x2000,
      arguments: [{ mask: 0x0fff, shift: 0, type: 'A' }],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // 2nnn - Call subroutine at nnn
    if (cpu.SP === 15) {
      cpu.halted = true;
      throw new Error('Stack overflow.');
    }

    cpu.SP++;
    cpu.stack[cpu.SP] = cpu.PC + 2;
    cpu.PC = args[0];
  }
}

export default new CALL_ADDR();
