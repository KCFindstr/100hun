import { FastifyInstance, FastifyServerOptions } from 'fastify';
import Jimp from 'jimp';
import { hunGenerator } from '../generator/100hun/generator';

interface Params {
  num: string;
}

export function BadgePlugin(
  fastify: FastifyInstance,
  _options: FastifyServerOptions,
  done: (err?: Error) => void,
) {
  fastify.get('/badge/:num', async (req, res) => {
    const { num } = req.params as Params;
    const number = Number(num);
    if (isNaN(number)) {
      return res.code(400).send('Bad Request');
    }
    const image = await hunGenerator.generate(number);
    return res
      .header('Content-Type', 'image/png')
      .send(await image.getBufferAsync(Jimp.MIME_PNG));
  });
  done();
}
