import multer from 'multer'
import fs from 'fs'
import { DocumentProcessorServiceClient } from '@google-cloud/documentai'
import dotenv from 'dotenv' 
import { text } from 'stream/consumers'

dotenv.config()
const upload = multer({ dest: 'uploads/boleta' });

const projectId = process.env.PROJECTID;
const location = process.env.LOCATION;
const processorId = process.env.PROCESSORID;
const port = process.env.PORT;


export async function getText(file ,mimeType){
  
    const filePath =file ;
    const mimeTypeFilter = mimeType ;
    const client = new DocumentProcessorServiceClient();
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;
    if(!projectId && !location && !processorId && !port){console.log("faltan las variables de ingreso");} 

    if(!mimeTypeFilter){console.log('El mimeType esta vacio')
      }else if(mimeType === 'application/pdf'){try{
      
        const fileContent = await fs.readFileSync(filePath);
        const encodedImage = Buffer.from(fileContent).toString('base64');
         
        const request = {
            name,
            rawDocument: {
              content: encodedImage,
              mimeType: 'application/pdf',
            }
        }
        const [result] = await client.processDocument(request);
        const {document} = result;
        const {text} = document;           
        return text   
        
        } catch (error) {
              console.log('Error al obtener el texto :',error)
        }        
      }else if(mimeType === 'image/png' || mimeType==='image/jpeg'){
        const fileContent = await fs.readFileSync(filePath);
        const encodedImage = Buffer.from(fileContent).toString('base64');
        const request = {
          name,
          rawDocument: {
            content: encodedImage,
            mimeType: 'image/png',
          }
      }



    
      } 


};

export default getText(file ,mimeType)

