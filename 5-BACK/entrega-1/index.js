let loanCalc = require('loan-calc');

let loanAmount = process.argv[2];  //el primer valor que debe introducir el usuario es la cantidad total del préstamo
let rateAmount = process.argv[3];  //el segundo valor que debe introducir el usuario es el porcentaje de interés anual que debe abonar
let monthsAmount = process.argv[4];  //el tercer valor que debe introducir el usuario son los meses en los que quiere pagar el préstamo


let resultadoPrestamo = loanCalc.paymentCalc({
    amount: loanAmount,
    rate: rateAmount,
    termMonths: monthsAmount  
});

console.log(`Deberás pagar ${resultadoPrestamo}€ al mes durante ${monthsAmount} meses.`) //el resultado se imprime en la consola
