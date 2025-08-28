export class RomBuffer {
  data;

  /**
   * @param {binary} fileContents ROM binary
   */
  constructor(fileContents: any) {
    this.data = [];

    // Читаем сырые данные буфера из файла
    const buffer = fileContents;

    // Создаём 16-битные опкоды big endian из буфера
    for (let i = 0; i < buffer.length; i += 2) {
      this.data.push((buffer[i] << 8) | (buffer[i + 1] << 0));
    }
  }
}
