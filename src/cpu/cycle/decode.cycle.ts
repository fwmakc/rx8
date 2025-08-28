import { disassemble } from '../disassemble/disassemble';
import { IDisassembled } from '../disassemble/disassembled.interface';

export function decode(opcode: any): IDisassembled {
  return disassemble(opcode);
}
