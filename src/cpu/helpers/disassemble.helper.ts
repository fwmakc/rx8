import { instructions } from '../instructions/data/instructions.data';
import { IInstruction } from '../instructions/interfaces/instruction.interface';
import { IDisassembled } from '../instructions/interfaces/disassembled.interface';

export function disassemble(opcode: any): IDisassembled {
  // Ищем инструкцию исходя из байт-кода
  const instruction: IInstruction | undefined = instructions.find(
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
