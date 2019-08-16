declare type Config = {
    dir: string;
    debug: boolean;
    debugCallback: (log: string) => void;
};
declare class Builder {
    dir: string;
    debug: boolean;
    debugCallback: (log: string) => void;
    cache: any;
    constructor(config: Config);
    log(log: string): void;
    readXmlToCache(): void;
    getSqlDefine(namespace: string, queryName: string, params: any): string;
    fillParams(sql: any, data: any): {
        sql: any;
        params: any[];
    };
    build(namespace: string, queryName: string, params: any): string;
}
export default Builder;
