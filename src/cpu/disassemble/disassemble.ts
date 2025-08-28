import { IInstruction } from '../instructions/instruction.interface';
import { INSTRUCTIONS_SET } from '../instructions/instructions.set';
import { IDisassembled } from './disassembled.interface';

export function disassemble(opcode: any): IDisassembled {
  // Ищем инструкцию исходя из байт-кода
  const instruction: IInstruction | undefined = INSTRUCTIONS_SET.find(
    (instruction) => (opcode & instruction.mask) === instruction.pattern,
  );

  if (!instruction) {
    throw new Error(`Unknown opcode: ${opcode}`);
  }

  // Ищем аргументы
  const args = instruction.arguments.map(
    (arg) => (opcode & arg.mask) >> arg.shift,
  );

  // Возвращает объект, содержащий id инструкции и аргументы
  return { id: instruction.id, args };
}
