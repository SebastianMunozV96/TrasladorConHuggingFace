import { fromBuffer } from "pdf2pic";
import path from "node:path"

// DOCS https://github.com/yakovmeister/pdf2image/tree/aa5ac4f970b930f69197541fc4ecb9c76e496830

async function convertFromURL(urlToPDF: string) {
    const imgFetch = await fetch(urlToPDF);

    const bufferImgArray: ArrayBuffer = await imgFetch.arrayBuffer()
    const bufferImg = Buffer.from(new Uint8Array(bufferImgArray));

    const options = {
        density: 100,
        format: "png",
        width: 600,
        height: 600
    }

    const convert = fromBuffer(bufferImg, options);
    const pageToConvertAsImage = 1;

    const { path, name, fileSize } = await convert(pageToConvertAsImage, { responseType: "image" })
    return {
        path,
        name,
        fileSize
    }
}

async function convertFromFile(file: Buffer) {
    const pdftPathSave: string = path.resolve(__dirname);
    const now = new Date().getTime()
    const options = {
        density: 100,
        saveFilename: `factura-${now}`,
        savePath: pdftPathSave,
        format: "png",
        width: 600,
        height: 600
    }
    try {
        const buffer = Buffer.from(new Uint8Array(file));
        const convert = fromBuffer(buffer, options);
        const pageToConvertAsImage = 1;

        const result = await convert(pageToConvertAsImage, { responseType: "image" })
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }

}


export { convertFromFile, convertFromURL }