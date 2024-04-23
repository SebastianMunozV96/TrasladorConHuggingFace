import path from "node:path"
import { HfInference } from "@huggingface/inference";
import { readMyFile } from "./utils/readFiles";
import { convertFromFile, convertFromURL } from "./utils/pdtopng.converter";
import { exit } from "node:process";


// Ruta de la imagen local
const main = async () => {
  console.clear();
  const pdfFile: string = path.resolve(__dirname, '../', "factura.pdf");
  const hf: HfInference = new HfInference("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");
  const model = "impira/layoutlm-document-qa";
  // const model = "jinhybr/OCR-Donut-CORD";
  // Aquí puedes hacer lo que necesites con los datos de la imagen

  // const imgFetch = await fetch(
  //   "https://huggingface.co/spaces/impira/docquery/resolve/2359223c1837a7587402bda0f2643382a6eefeab/invoice.png"
  // );

  try {
    const img: Buffer = await readMyFile(pdfFile);
    // const img = await readMyFile(imgFetch);
    const archivoConvertido = await convertFromFile(img)
    if (!archivoConvertido) {
      console.log("error al crear archivo")
      exit(0)
    }
    const imgBuffer = await readMyFile(archivoConvertido!.path!)
    const result = await hf.documentQuestionAnswering({
      model,
      inputs: {
        question: "cual es el medio de pago?",
        image: new Blob([imgBuffer], { type: 'image/png' }), // <- archivo local
        // image: await imgBuffer.arrayBuffer(), // <- archivo remoto
      },
    });

    console.log("//------------//");
    // console.log(imgFetch);
    console.log(result);
    console.log("//------------//");

  } catch (error) {
    console.log("error en la petición: ", error);
  }
}
// C:\Users\Leonardo\Desktop\seba\TrasladorConHuggingFace\factura.pdf
main()
//const image = 'C:/Users/seba_/OneDrive/Escritorio/practica/Muestras%20boletas%20Feb%202021.pdf';