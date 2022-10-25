import { INumberProvider } from '../interface';

const SUPPORTED_SERVICES = [
  'github',
  'github_enterprise',
  'gitlab',
  'gitlab_enterprise',
  'bitbucket',
  'bitbucket_server',
];
const TOKEN = process.env.CODECOV_TOKEN;

interface CodeCovResponse {
  head_commit?: {
    totals?: {
      coverage?: number;
    };
  };
}

export class CodeCovProvider implements INumberProvider {
  public readonly providerId = 'codecov';

  public async getNumber(
    service: string,
    owner: string,
    repo: string,
    branch: string,
  ): Promise<number> {
    if (!SUPPORTED_SERVICES.includes(service)) {
      throw new Error(
        `[CodeCov] Unsupported service: ${service}, supported services: ${SUPPORTED_SERVICES.join(
          ', ',
        )}`,
      );
    }
    const res = await fetch(
      `https://codecov.io/api/v2/${service}/${owner}/repos/${repo}/branches/${branch}/`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    const data: CodeCovResponse = await res.json();
    return data.head_commit?.totals?.coverage;
  }
}
