import path from "node:path"
import dotenv from "dotenv"
import axios from "axios"
import { HfInference } from "@huggingface/inference";
import { readMyFile } from "./utils/readFiles"
import { pipeline } from "@xenova/transformers";

dotenv.config()

async function main() {
    
    const token = process.env.API
    const workerID = process.env.WORKER
    const url = "https://worker.formextractorai.com/v2/extract"

    const pdfFile: string = path.resolve(__dirname, '../', "src", "Factura.pdf");
    console.log(pdfFile)
    const pdfBuffer = await readMyFile(pdfFile)
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')
    const pdfText:string = '';
       
           async function ResultApi(pdfText:string) {
            axios.post(url, pdfBase64, {
                headers: {
                    "X-WORKER-TOKEN": token,
                    "X-WORKER-EXTRACTOR-ID": workerID,
                    "Content-Type": "image/png",
                    "X-WORKER-ENCODING": "base64"
                }
            
            }).then((response) => {
                console.log(response.data)

                const pdfText = JSON.stringify(response.data)
                console.log(pdfText)

                return Promise.resolve(pdfText);

            }).catch((error) => {
                console.log("error de response "+error)
            })
           }
            
     

    const hfEnv = process.env.HF
    const hf: HfInference = new HfInference(hfEnv);
    const model = "bert-base-uncased";
    const context:string = await ResultApi(pdfText)
      
    try {
        const result  = await hf.questionAnswering({
            model:model,
            inputs:{
                context: context,
               question:'Cual es el Total Neto',
              
            }
        });
         console.log(result)
     } catch (error) {
        console.log('Error a la peticion de IA ')
     }




}
main()