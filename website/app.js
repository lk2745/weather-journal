/* Global Variables */

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=cf4822f935696753a229246ddb152413';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



// Event listener to add function to existing HTML DOM element
// named callback function as the second parameter
document.getElementById('generate').addEventListener('click',performAction); 


/* Function called by event listener */
function performAction(e){
  const feeling = document.getElementById('feelings').value;
  const zipCode = document.getElementById('zip').value;
  getWeather(baseURL, zipCode, apiKey)

    .then(function(data) {
      postData('/weather', {date:d, temp:data.main.temp, response:feeling} );
    })
    .then(
      updateUIElement()
    )  
}


/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key)=> {
  console.log("Running getWeather function");
  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  } catch(error) {
      console.log("error", error);
      // appropriately handle the error 
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log("postData running", data)
    const response = await fetch(url,{
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });
  
    try {
      const newData = await response.json();
      // console.log(newData);
      return newData
    }catch(error) {
      console.log("error", error);
    }
}


/* Function to Update UI */
const updateUIElement = async () => {
  const request = await fetch('/all');
  try {
    const getData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${getData[0].date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${getData[0].temp}`;
    document.getElementById('content').innerHTML = `My feeling is ${getData[0].response}`;

  }catch(error) {
   console.log("error", error);
  }
}






