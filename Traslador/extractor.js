 import { HfInference } from "@huggingface/inference";
 import { readFile} from 'fs/promises';
 import { fileURLToPath } from 'url';
 import { dirname } from 'path';


 // Ruta de la imagen local
 const imagePath = 'invoice.png';
 //const fs = require('fs');
 
 const hf = new HfInference("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")
 const model = 'impira/layoutlm-document-qa'
 // Aquí puedes hacer lo que necesites con los datos de la imagen
 const imagefet = await (await fetch('https://huggingface.co/spaces/impira/docquery/resolve/2359223c1837a7587402bda0f2643382a6eefeab/invoice.png'));

       
        try {
            async function readMyFile(filePath) {
                try {
                return await readFile(filePath, 'utf8');
                } catch (err) {
                console.error('Error reading the file:', err);
                }
                }
                
                const img = await readMyFile(imagePath);
                

        const result = await hf.documentQuestionAnswering({
            model,
            inputs:{
                question: 'cual es el total neto?',
                image:new Blob([img])
            }
        });

       
         console.log(imagefet)
         console.log("//------------//")
         console.log(img)
            console.log(result)
        } catch (error) {
            console.log("error en la petición")
        }
       






//const image = 'C:/Users/seba_/OneDrive/Escritorio/practica/Muestras%20boletas%20Feb%202021.pdf';



//----------------------------------
