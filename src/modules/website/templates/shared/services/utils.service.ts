export class UtilsService {
    public static findAll(regex: RegExp, sourceString: string, aggregator: any[] = []): any[] {

        const arr = regex.exec(sourceString);

        if (arr === null) { return aggregator; }

        const newString = sourceString.slice(arr.index + arr[0].length);
        return this.findAll(regex, newString, aggregator.concat([arr]));
    }

    public static cropImage(width: number, heigth: number, path: string): string {

        if (!path) {
            return null;
        }
        const pathmatch = path.match(/\/[0-9\-].+\//)[0].replace(/\//g, "").split("-");
        const imageCroped = path.replace(/\/[0-9\-].+\//, `/${pathmatch[0]}-${width}-${heigth}/`);

        return imageCroped;
    }


    public static formatePrice(price: number, separetor: string) {
        if (price === 0) {
            return "0,00";
        }
        const _price = price.toString();
        return _price.substr(0, _price.length - 2) + separetor + _price.substr(_price.length - 2, _price.length);
    }
}