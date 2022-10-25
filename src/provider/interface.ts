export interface INumberProvider {
  providerId: string;
  getNumber(
    service: string,
    owner: string,
    repo: string,
    branch: string,
  ): Promise<number | undefined>;
}
