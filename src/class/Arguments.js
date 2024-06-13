export class Arguments {
    constructor(outputJson, verbose, structureFile, toZip, toTar) {
        this.outputJson = outputJson;
        this.verbose = verbose;
        this.structureFile = structureFile;
        this.toZip = toZip;
        this.toTar = toTar;
    }
}