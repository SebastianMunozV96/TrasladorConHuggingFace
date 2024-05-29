import dotenv from 'dotenv' 
import axios from 'axios'

dotenv.config()

const apiKey =process.env.KEY
const endPoint ='https://api.openai.com/v1/chat/completions';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
};

const preguntasAdicionales =[ 
    "Cual es el total ?",
    "cual es el total consumio?",
    "cual es la fecha de emision y de vencimiento?"

];

const   getResponse = async(text,preguntasAdicionales)=>{

const getText = text ;

const mensaje = {
    model: "gpt-4",  
    messages: [
        { role: "system", content: "Eres un asistente útil." },
        { role: "user", content: getText }
    ]
};
try {

    let response = await axios.post(endPoint,{ 
    model: "gpt-4o",
    messages:mensaje
    },{headers:headers} )

    let respuesta = response.data.choices[0].message.content;
    console.log(`ChatGPT: ${respuesta}`);

    for (let preguntas of preguntasAdicionales) {
        mensaje.push({ role: "user", content: pregunta });

        response = await axios.post(endpoint, {
            model: "gpt-4",
            messages: mensajes
        }, { headers: headers });

        respuesta = response.data.choices[0].message.content;

        console.log(`ChatGPT: ${respuesta}`);
    }
    
} catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message)
}

};

export default getResponse(text,preguntasAdicionales)