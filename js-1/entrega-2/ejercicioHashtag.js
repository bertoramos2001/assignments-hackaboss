

tweets = [
  'aprendiendo #javascript en  Vigo',
  'empezando el segundo módulo del bootcamp!',
  'hack a boss bootcamp vigo  #codinglive #javascript'
]
output = [];

for (i = 0; i < tweets.length; i++) {
  if (tweets[i].indexOf('#') != -1) {
    firstHashtagIndex = tweets[i].indexOf('#');
    firstHashtagWhole = tweets[i].slice(firstHashtagIndex, firstHashtagIndex + 11)
    if (output.indexOf(firstHashtagWhole) == -1){
      output.push((tweets[i].slice(firstHashtagIndex, firstHashtagIndex + 11)))
  }
    if (tweets[i].indexOf('#', tweets[i].indexOf('#') + 1) != -1) {
      secondHashtagIndex = tweets[i].indexOf('#', tweets[i].indexOf('#') + 1)
      secondHashtagWhole = tweets[i].slice(secondHashtagIndex,secondHashtagIndex+11)
      if (output.indexOf(secondHashtagWhole) == -1) {
      output.push((tweets[i].slice(secondHashtagIndex,secondHashtagIndex+11)))
      }
    }
  }
}

console.log(output);