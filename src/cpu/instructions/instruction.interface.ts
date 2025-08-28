export interface IInstruction {
  key: number;
  id: string;
  name: string;
  mask: number;
  pattern: number;
  arguments: {
    mask: number;
    shift: number;
    type: string;
  }[];
}
