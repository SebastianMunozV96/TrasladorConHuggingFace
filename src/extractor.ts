import  {config} from 'dotenv'  ;
import fs from 'fs/promises';

config()

const projectID = process.env.projectID
const location = process.env.location
const procesorID = process.env.proccesorID

 const filePath = 'Factura.pdf';

  const {DocumentProcessorServiceClient} =
  require('@google-cloud/documentai').v1;

  const cliente = new DocumentProcessorServiceClient();

  async function  processDocument() {
  const name =`projects/${projectID}/locations/${location}/processors${procesorID}`   

   const imageFile = await fs.readFile(filePath)
   const encodeImage = Buffer.from(imageFile).toString('base64');

   const request ={
    name,
    rawDocument:{
        content:encodeImage,
        MimeType:'application/pdf'
    }
   }
  
   const [result] = await cliente.processDocument(request);
   const {document} = result;
 
   const {text} = document;
 
   console.log('texto y documento : ',text , document)
  }