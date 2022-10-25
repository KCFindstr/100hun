import Fastify from 'fastify';
import { config } from 'dotenv';

async function main() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.listen({ port: parseInt(process.env.PORT) }, (err, addr) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${addr}`);
  });
}

if (require.main === module) {
  config();
  void main();
}
