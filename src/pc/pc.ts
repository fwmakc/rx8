import { CPU } from '../cpu/cpu';
import { ICpu } from '../cpu/interfaces/cpu.interface';

export class PC {
  halted = true;
  soundEnabled = false;

  cpu: CPU | null = null;

  interface: ICpu;

  constructor(cpuInterface: ICpu) {
    this.interface = cpuInterface;
    this.cpu = new CPU(cpuInterface);
  }
}
