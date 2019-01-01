export type Resovler = (parent: any, args: any, context: any, info: any) => any;

export interface Resovlers {
    [key: string]: {
        [key: string]: Resovler;
    };
}