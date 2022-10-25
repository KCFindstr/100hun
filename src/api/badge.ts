import { FastifyInstance, FastifyServerOptions } from 'fastify';
import Jimp from 'jimp';
import { hunGenerator } from '../generator/100hun/generator';

interface Params {
  num: string;
}

interface Queries {
  size: string;
}

export function BadgePlugin(
  fastify: FastifyInstance,
  _options: FastifyServerOptions,
  done: (err?: Error) => void,
) {
  fastify.get('/badge/:num.png', async (req, res) => {
    const number = Number((req.params as Params).num);
    if (isNaN(number)) {
      return res.code(400).send('Bad Request');
    }
    const image: Jimp = await hunGenerator.generate(number);
    let size = parseInt((req.query as Queries).size);
    if (!isNaN(size)) {
      size = Math.min(256, Math.max(size, 16));
      image.resize(size, size);
    }
    return res
      .header('Content-Type', 'image/png')
      .send(await image.getBufferAsync(Jimp.MIME_PNG));
  });
  done();
}
