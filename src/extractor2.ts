// import path from "node:path"
// import { HfInference } from "@huggingface/inference";
// import { readMyFile } from "./utils/readFiles";


// import { exit } from "node:process";

// // pdf -> png -> texto -> ia -> respuesta
// // Ruta de la imagen local
// const main = async () => {
//   console.clear();
//   const pdfFile: string = path.resolve(__dirname, '../', "factura.pdf");
//   const hf: HfInference = new HfInference("");
//   // const model = "impira/layoutlm-document-qa";
//   // const model = "jinhybr/OCR-Donut-CORD";
//   // const model = "Salesforce/blip-image-captioning-large";
//   const model = "vikhyatk/moondream2";
//   // Aquí puedes hacer lo que necesites con los datos de la imagen
//   try {
//     const img: Buffer = await readMyFile(pdfFile);
//     // const img = await readMyFile(imgFetch);
    
//     if (!archivoConvertido) {
//       console.log("error al crear archivo")
//       exit(0)
//     }
//     const imgBuffer = await readMyFile(archivoConvertido!.path!)
//     const result = await hf.imageToText({
//       model,
//       data: new Blob([imgBuffer]),
//       // inputs: {
//       //   question: "cual es el medio de pago?",
//       //   image: new Blob([imgBuffer], { type: 'image/png' }), // <- archivo local
//       //   // image: await imgBuffer.arrayBuffer(), // <- archivo remoto
//       // },
//     });

//     console.log("//------------//");
//     // console.log(imgFetch);
//     console.log(result.generated_text);
//     console.log("//------------//");

//   } catch (error) {
//     console.log("error en la petición: ", error);
//   }
// }

// main()

