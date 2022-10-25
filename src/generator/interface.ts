import Jimp from 'jimp';

export interface IGenerator {
  generate(num: number): Promise<Jimp>;
}
