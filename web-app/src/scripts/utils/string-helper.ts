export class StringHelper {
    static isNullOrWhitespace(str: string) {
        return str == null || str.trim().length === 0;
    }
}
