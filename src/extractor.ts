import path from "node:path"
import dotenv from "dotenv"
import axios from "axios"
import { readMyFile } from "./utils/readFiles"
dotenv.config()
async function main() {
    
    const token = process.env.API
    const workerID = process.env.WORKER
    const url = "https://worker.formextractorai.com/v2/extract"

    const pdfFile: string = path.resolve(__dirname, '../', "factura.pdf");
    const pdfBuffer = await readMyFile(pdfFile)
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')
    axios.post(url, pdfBase64, {
        headers: {
            "X-WORKER-TOKEN": token,
            "X-WORKER-EXTRACTOR-ID": workerID,
            "Content-Type": "image/png",
            "X-WORKER-ENCODING": "base64"
        }
    }).then((response) => {
        console.log(response.data.documents)
    }).catch((error) => {
        console.log(error.data)
    })


}
main()