import { disassemble } from './disassemble.helper';
import { IDisassembled } from '../instructions/interfaces/disassembled.interface';

export function decode(opcode: any): IDisassembled {
  return disassemble(opcode);
}
