import path from "node:path"
import dotenv from "dotenv"
import axios from "axios"
import { HfInference } from "@huggingface/inference";
import { readMyFile } from "./utils/readFiles"
import pdfParse, { type Result } from "pdf-parse"
// import { pipeline } from "@xenova/transformers";

dotenv.config()

async function main() {

    const token = process.env.API
    const workerID = process.env.WORKER
    const url = "https://worker.formextractorai.com/v2/extract"

    const pdfFile: string = path.resolve(__dirname, '../', "src", "Page.pdf");
    console.log(pdfFile)
    const pdfBuffer = await readMyFile(pdfFile)
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')

    async function getTextFromPdf(file: Buffer): Promise<string> {
        const result: Result = await pdfParse(file, {

        })
        // console.log(result.text)
        return tokenizar(result.text)
    }
    function tokenizar(texto: string): string {
        const encoder = new TextEncoder();
        const utf8Bytes = encoder.encode(texto);
        const decoder = new TextDecoder('iso-8859-1');
        const textoISO = decoder.decode(utf8Bytes);
        return textoISO.split(/\W+/).toString().replace(/,/g, ' ').replace(/\n/g, ' ')
    }

    async function getStringJsonDataFromFormExtractor(pdfText: string) {
        const { data, status } = await axios.post(url, pdfBase64, {
            headers: {
                "X-WORKER-TOKEN": token,
                "X-WORKER-EXTRACTOR-ID": workerID,
                "Content-Type": "image/png",
                "X-WORKER-ENCODING": "base64"
            }

        })
        if (data == 'failed') {
            console.log("no data")
            return ""
        }
        console.log(data.documents[0])
        return JSON.stringify(data.documents)
        // const pdfString = JSON.stringify()
    }

    console.log("###################################")
    const hfEnv = process.env.TOKEN_hf
    const hf: HfInference = new HfInference(hfEnv);
    // const model = "bert-base-uncased";
    const model = "deepset/roberta-base-squad2";
    const pdfTexto = await getTextFromPdf(pdfBuffer)
    const context: string = tokenizar(pdfTexto)
    console.log("contexto: ", context)

    try {
        const result = await hf.questionAnswering({
            model: model,
            inputs: {
                context: context,
                question: 'Cual es el monto Neto?',
            }
        });
        console.log(result)
    } catch (error) {
        console.log("Error en peticion")
        console.log('detalle error ', error)
    }
}
main()