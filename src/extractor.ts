import path from "node:path"
import { HfInference } from "@huggingface/inference";
import { readMyFile } from "./utils/readFiles";

// Ruta de la imagen local
const main = async () => {
  console.clear();
  const imagePath: string = path.resolve(__dirname, "BoletaElec.jpeg");
  const hf: HfInference = new HfInference("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");
  const model = "impira/layoutlm-document-qa";
  // Aquí puedes hacer lo que necesites con los datos de la imagen
  
  const imgFetch = await fetch(
    "https://huggingface.co/spaces/impira/docquery/resolve/2359223c1837a7587402bda0f2643382a6eefeab/invoice.png"
  );

  try {
    const img : Buffer = await readMyFile(imagePath);
    // const img = await readMyFile(imgFetch);

    const result = await hf.documentQuestionAnswering({
      model,
      inputs: {
        question: "What is the net total amount?",
        image: new Blob([img], { type: 'image/jpeg' }), // <- archivo local
        // image: await imgFetch.arrayBuffer(), // <- archivo remoto
      },
    });

    console.log("//------------//");
    // console.log(imgFetch);
    console.log(result);
  } catch (error) {
    console.log("error en la petición: ", error);
  }
}

main()
//const image = 'C:/Users/seba_/OneDrive/Escritorio/practica/Muestras%20boletas%20Feb%202021.pdf';