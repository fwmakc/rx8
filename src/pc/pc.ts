import { CPU } from '../cpu/cpu';
import { ICpu } from '../cpu/interfaces/cpu.interface';
import { loop } from './helpers/loop.helper';
import { RomBuffer } from '../rom/rom';

export class PC {
  soundEnabled = false;
  timer = 0;

  cpu: CPU | null = null;

  interface: ICpu;

  constructor(cpuInterface: ICpu) {
    this.interface = cpuInterface;
    this.cpu = new CPU(cpuInterface);
  }

  async runLoop() {
    await loop(() => {
      if (!this.cpu) {
        return true;
      }

      this.timer++;

      if (this.timer % 5 === 0) {
        this.cpu.tick();
        this.timer = 0;
      }

      if (!this.cpu.halted) {
        this.cpu.step();
      }

      return true;
    }, 1);
  }

  loadRom(rom: any) {
    if (!this.cpu) {
      return;
    }

    console.log('-- arrayBuffer', rom);
    const uint8View = new Uint8Array(rom);
    const romBuffer = new RomBuffer(uint8View);

    this.cpu.interface.clearDisplay();
    this.cpu.load(romBuffer);
  }
}
