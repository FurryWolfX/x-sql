declare type Config = {
    dir: string;
    debug: boolean;
    debugCallback: (log: string) => void;
};
declare class Builder {
    private readonly dir;
    private readonly debug;
    private readonly debugCallback;
    private readonly cache;
    constructor(config: Config);
    private log;
    private readXmlToCache;
    private getSqlDefine;
    private fillParams;
    build(namespace: string, queryName: string, params: any): string;
}
export default Builder;
