import { CPU } from '../cpu';

export function fetch(cpu: CPU) {
  if (cpu.PC > 4094) {
    cpu.halted = true;
    throw new Error('Memory out of bounds.');
  }

  // We have to combine two bytes in memory back into one big endian opcode
  // Left shifting by eight will move one byte over two positions - 0x12 will become 0x1200
  // Left shifting by zero will keep one byte in the same position - 0x34 is still 0x34
  // OR them together and get one 16-bit opcode - 0x1200 | 0x34 returns 0x1234
  return (cpu.memory[cpu.PC] << 8) | (cpu.memory[cpu.PC + 1] << 0);
}
