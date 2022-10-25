import { FastifyInstance, FastifyServerOptions } from 'fastify';
import Jimp from 'jimp';
import { hunGenerator } from '../generator/100hun/generator';
import { numberProviderManager } from '../provider/number-provider';

interface Params {
  provider: string;
  service: string;
  owner: string;
  repo: string;
  branch: string;
}

export function ServicePlugin(
  fastify: FastifyInstance,
  _options: FastifyServerOptions,
  done: (err?: Error) => void,
) {
  fastify.get(
    '/provider/:provider/:service/:owner/:repo/:branch/badge.png',
    async (req, res) => {
      const { provider, service, owner, repo, branch } = req.params as Params;
      const numberProvider = numberProviderManager.get(provider);
      if (!numberProvider) {
        return res.code(404).send(`Provider ${provider} not found`);
      }
      try {
        const number = await numberProvider.getNumber(
          service,
          owner,
          repo,
          branch,
        );
        const image = await hunGenerator.generate(number);
        return res
          .header('Content-Type', 'image/png')
          .send(await image.getBufferAsync(Jimp.MIME_PNG));
      } catch (e) {
        return res.code(400).send(e.message || e);
      }
    },
  );
  done();
}
