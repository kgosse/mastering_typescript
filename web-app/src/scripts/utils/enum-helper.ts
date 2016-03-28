export class EnumHelper {
    static getNames(e: any) {
        return Object.keys(e)
                     .filter(v => isNaN(parseInt(v, 10)));
    }

    static getValues(e: any) {
        return Object.keys(e)
                     .map(v => parseInt(v, 10))
                     .filter(v => !isNaN(v));
    }

    static getNamesAndValues(e: any) {
        return EnumHelper.getValues(e)
                         .map(v => { return { name: e[v] as string, value: v }; });
    }
}
