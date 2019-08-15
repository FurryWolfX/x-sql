declare interface Config {
  dir: string;
  debug: boolean;
  debugCallback(log: string): void;
}

export declare class Builder {
  constructor(config: Config);
  build(namespace: string, queryName: string, params: any): string;
}

export default Builder;
