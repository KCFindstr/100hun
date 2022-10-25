import Jimp from 'jimp';
import { IGenerator } from '../interface';

export class HunGenerator implements IGenerator {
  private readonly _images: Jimp[] = [];
  private _imageBase: Jimp;
  private _font: any;

  public async init() {
    this._imageBase = await Jimp.read('assets/100hun.png');
    this._font = await Jimp.loadFont('assets/font.fnt');
    for (let i = 0; i <= 100; i++) {
      const image = this._imageBase.clone();
      const str = i.toString();
      image.print(this._font, 128 - str.length * 20, -4, str, 128);
      this._images.push(image);
    }
  }

  public async generate(num: number): Promise<Jimp> {
    if (!this._font) {
      await this.init();
    }
    const index = Math.floor(num + 0.5);
    return this._images[index] || this._imageBase;
  }
}

export const hunGenerator = new HunGenerator();
