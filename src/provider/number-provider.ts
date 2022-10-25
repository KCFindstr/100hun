import { INumberProvider } from './interface';

class NumberProviderManager {
  private readonly _providers: INumberProvider[] = [];

  public register(provider: INumberProvider) {
    this._providers.push(provider);
  }

  public get(id: string): INumberProvider {
    return this._providers.find((p) => p.providerId === id);
  }
}

export const numberProviderManager = new NumberProviderManager();
