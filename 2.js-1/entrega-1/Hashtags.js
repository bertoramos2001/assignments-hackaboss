

tweets = [
  'aprendiendo #javascript en Vigo',
  'empezando el segundo módulo del bootcamp!',
  'hack a boss bootcamp vigo #codinglive #javascript'
]
let splitTweets = [];
for (let i = 0; i < tweets.length; i++) {   //separar cada elemento del array 'tweets' en distintos arrays, cada uno contiene todas las palabras del cada elemento por separado
  splitTweets.push(tweets[i].split(' '));
}

let hashtagsArray = [];
for (let i = 0; i < splitTweets.length; i++) {
  for (let j = 0; j < splitTweets[i].length; j++) {   //coger las palabras que empiezan por el símbolo '#' y meterlas todas en un mismo array
    if((splitTweets[i][j].charAt(0)) == '#') {
      hashtagsArray.push(splitTweets[i][j]);
    }
  }
}

let index = 0;
let output = [];
for (let i = 0; i < hashtagsArray.length; i++) {
  if(hashtagsArray.indexOf(hashtagsArray[i]) == index) { //filtrar los hashtags y eliminar los repetidos del array
    output.push(hashtagsArray[i]);
  }
  index++;
}

console.log(output) //devolver el array con todos los hashtags de los tweets
