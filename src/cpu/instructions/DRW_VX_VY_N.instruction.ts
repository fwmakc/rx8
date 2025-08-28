import { IInstruction } from './interfaces/instruction.interface';
import { CPU } from '../cpu';
import { InstructionTemplate } from './templates/instruction.template';
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from '../interfaces/data/constants';

class DRW_VX_VY_N extends InstructionTemplate {
  get(): IInstruction {
    return {
      key: 24,
      id: 'DRW_VX_VY_N',
      name: 'DRW',
      mask: 0xf000,
      pattern: 0xd000,
      arguments: [
        { mask: 0x0f00, shift: 8, type: 'R' },
        { mask: 0x00f0, shift: 4, type: 'R' },
        { mask: 0x000f, shift: 0, type: 'N' },
      ],
    };
  }

  execute(cpu: CPU, args: any[]): void {
    // Dxyn - Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision
    if (cpu.I > 4095 - args[2]) {
      cpu.halted = true;
      throw new Error('Memory out of bounds.');
    }

    // If no pixels are erased, set VF to 0
    cpu.registers[0xf] = 0;

    // The interpreter reads n bytes from memory, starting at the address stored in I
    for (let i = 0; i < args[2]; i++) {
      const line = cpu.memory[cpu.I + i];
      // Each byte is a line of eight pixels
      for (let position = 0; position < 8; position++) {
        // Get the byte to set by position
        const value = line & (1 << (7 - position)) ? 1 : 0;
        // If this causes any pixels to be erased, VF is set to 1
        const x = (cpu.registers[args[0]] + position) % DISPLAY_WIDTH; // wrap around width
        const y = (cpu.registers[args[1]] + i) % DISPLAY_HEIGHT; // wrap around height

        if (cpu.interface.drawPixel(x, y, value)) {
          cpu.registers[0xf] = 1;
        }
      }
    }

    cpu._nextInstruction();
  }
}

export default new DRW_VX_VY_N();
