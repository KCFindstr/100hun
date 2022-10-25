import { config } from 'dotenv';
config();

import Fastify from 'fastify';
import { numberProviderManager } from './provider/number-provider';
import { CodeCovProvider } from './provider/codecov/provider';
import { BadgePlugin } from './api/badge';
import { ServicePlugin } from './api/service';

async function main() {
  const fastify = Fastify({
    logger: true,
  });

  numberProviderManager.register(new CodeCovProvider());

  fastify.get('/', (_req, res) => {
    return res.redirect(302, 'https://github.com/KCFindstr/100hun');
  });

  await fastify.register(BadgePlugin);
  await fastify.register(ServicePlugin);

  fastify.listen({ port: parseInt(process.env.PORT) }, (err, addr) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${addr}`);
  });
}

if (require.main === module) {
  void main();
}
