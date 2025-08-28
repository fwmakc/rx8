import { IInstruction } from '../interfaces/instruction.interface';
import * as i from '../';

export const instructions: IInstruction[] = [];

Object.values(i).forEach((element) => {
  instructions.push(element.get());
});

instructions.sort((a, b) => a.key - b.key);
