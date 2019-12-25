type XNode = {
    name: string;
    type: string;
    value: string;
    attributes: {
        namespace: string;
        name: string;
        condition: string;
        separator: string;
        array: string;
    };
    children: XNode[];
};

declare module "sqlstring" {
    export function escapeId(id: string): string;
    export function escape(v: string): string;
    export function format(sql: string, params: Array<string | number>): string;
}

declare module "tsqlstring" {
    export function escapeId(id: string): string;
}

declare module "xml-reader" {
    export function parseSync(xmlStr: string): XNode;
}