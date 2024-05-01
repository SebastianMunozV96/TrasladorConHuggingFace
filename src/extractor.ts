import * as  fs from 'fs';
import * as pdf  from 'pdf-parse'
import { HfInference } from '@xenova/inference';
import { pipeline } from '@xenova/transformers';
import dotenv from "dotenv"  

dotenv.config()


async function main() {

 const pdfPath = "./Factura.pdf";
 const dataBuffer  = fs.readFileSync(pdfPath)
 const  pdfText:string = dataBuffer.toString();

 console.log(pdfText)

 const HFToken = process.env.HF
 const hf  = new HfInference(HFToken);

 try {
    const result  = await hf.questionAnswering({
        model:'deepset/roberta-base-squad2',
        inputs:{
           question:'Cual es el Total Neto',
           context:pdfText
        }
    });
     console.log(result)
 } catch (error) {
    console.log('Error a la peticion de IA ')
 }
    
};

main();