declare type FileItem = {
    path?: string;
    filename?: string;
    url?: string;
};
export declare function readFileList(path: string, filesList?: any[]): FileItem[];
export {};
