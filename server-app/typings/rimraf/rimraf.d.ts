declare module "rimraf" {
    function rimraf(path: string, callback: (error: Error) => void): void;
    module rimraf {
        export function sync(path: string): void;
    }
    export = rimraf;
}
