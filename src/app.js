import express, { raw } from 'express'

const app = express();
app.listen(port);
console.log(`server on port ${port}`);

async function processDocument(filePath,mimeType){
  const mimeTypeFilter = mimeType ;
  const fileContent = await fs.readFileSync(filePath);
  const encodedImage = Buffer.from(fileContent).toString('base64');
   
};


app.post('/Proccesing', upload.single('file'), async (req, res)=>{
const filePath=req.file.path;

try {

  
} catch (error) {
  console.error('Error al obtener ')
}

})

