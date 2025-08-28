// const app = document.querySelector<HTMLButtonElement>('#app')!;

import { CPU } from './cpu/cpu';
import { RomBuffer } from './rom/rom';
import { WebCpuInterface } from './cpu/interfaces/WebCpuInterface';

const cpuInterface = new WebCpuInterface();
const cpu = new CPU(cpuInterface);

let timer = 0;

const cycle = () => {
  timer++;

  if (timer % 5 === 0) {
    cpu.tick();
    timer = 0;
  }

  if (!cpu.halted) {
    cpu.step();
  }

  setTimeout(cycle, 3);
};

async function loadRom(event: any) {
  const rom = event.target.value;
  console.log('-- rom', rom);
  const response = await fetch(`./roms/${rom}`);
  console.log('-- response', response);
  const arrayBuffer = await response.arrayBuffer();
  console.log('-- arrayBuffer', arrayBuffer);
  const uint8View = new Uint8Array(arrayBuffer);
  const romBuffer = new RomBuffer(uint8View);

  cpu.interface.clearDisplay();
  cpu.load(romBuffer);
}

const select = document.querySelector<HTMLDivElement>('select');
select?.addEventListener('change', loadRom);

cycle();
