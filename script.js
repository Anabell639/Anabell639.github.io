//Abre el canal de consulta a la API de huggingface
async function query(data) {
   const response = await fetch(
     "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
     {
       headers: { Authorization: "Bearer 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" },
       method: "POST",
       body: JSON.stringify(data),
     }
   );
   const result = await response.json();
  //const result = fakeResponse();

  return result;
}

function procesar() {
  userText=document.getElementById("textarea").value
  
  //Paso la entrada del usuario a la API y quedo esperando la respuesta que puede demorar un tiempo
  query({"inputs": userText}).then((response) => {
    const averageWeCalculated = averageScore(response);
    group(averageWeCalculated);
  });
}

function averageScore(response) {
  const sadness = response[0].find((item) => item.label == 'sadness').score
  const fear = response[0].find((item) => item.label == 'fear').score
  const anger = response[0].find((item) => item.label == 'anger').score
  const averageScore = (sadness + fear + anger) / 3

  return averageScore
}

function displayResultForGroup(thingsToDo) {
  const random = Math.floor(Math.random() * thingsToDo.length);
  const randomThingToDo = thingsToDo[random];
  document.getElementById("suggestion").innerHTML=randomThingToDo
}

const thingsToDoGroupOne = [
'Escucha música relajante', 'Respira profundamente y cuenta hasta 10', 'Abraza a alguien cercano', 'Escucha tu música favorita',
'Toma un vaso de agua', 'Practica respiraciones relajantes', 'Ve videos graciosos', '¡Practica gratitud! (Enumera cosas buenas)', 
'Haz una caminata al aire libre', 'Toma un vaso de agua', 'Visualiza un lugar tranquilo', 'Mira fotos de buenos recuerdos',
]

const thingsToDoGroupTwo = [
  'Habla con un amigo de confianza', 'Medita durante 10 minutos', 'Haz ejercicios (¡Libera endorfinas!)','Programa una cita con un terapeuta',
  'Practica autoafirmación positiva', 'Planifica un viaje futuro', 'Escribe una lista de metas y sueños!', 'Prueba hacer relajación muscular (como yoga)', 
  'Haz una actividad creativa (pintar, escribir, tocar algún instrumento)'
]

const CHANGECOLOR = document.getElementById('suggestion')
const ANOTHERSUGGESTION = document.getElementById('another')

function group(averageScore) {

  if (averageScore > 0 && averageScore < 0.5) {
    displayResultForGroup(thingsToDoGroupOne);
    CHANGECOLOR.style.backgroundColor = 'rgb(253 255 253 / 79%)';
    CHANGECOLOR.style.visibility = 'visible';
    ANOTHERSUGGESTION.style.visibility = 'visible';

  } else if (averageScore > 0.5 && averageScore < 1 ) {
    displayResultForGroup(thingsToDoGroupTwo)
    CHANGECOLOR.style.backgroundColor = 'rgb(151 211 224 / 89%)';
    CHANGECOLOR.style.visibility = 'visible';
    ANOTHERSUGGESTION.style.visibility = 'visible';
  }
}





