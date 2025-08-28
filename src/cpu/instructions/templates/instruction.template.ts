import { IInstruction } from '../interfaces/instruction.interface';
import { CPU } from '../../cpu';

export abstract class InstructionTemplate {
  abstract get(): IInstruction;
  abstract execute(cpu: CPU, args: any[]): void;
}
