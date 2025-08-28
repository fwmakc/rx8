import { WebCpuInterface } from './cpu/interfaces/WebCpuInterface';
import { PC } from './pc/pc';

const cpuInterface = new WebCpuInterface();

const pc = new PC(cpuInterface);

const select = document.querySelector<HTMLDivElement>('select');
select?.addEventListener('change', async (event: any) => {
  const rom = event.target.value;
  console.log('-- rom', rom);
  const response = await fetch(`./roms/${rom}`);
  console.log('-- response', response);
  const arrayBuffer = await response.arrayBuffer();
  pc.loadRom(arrayBuffer);
});

pc.runLoop();
