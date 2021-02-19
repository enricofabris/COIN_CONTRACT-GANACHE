var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){ // collega con metamask e i suoi account
      contractInstance = new web3.eth.Contract(abi, "0x6623444594c3555F9652AD1ed273f8317a55b35f", {from: accounts[0]});
      console.log(contractInstance);

      getPlayerBalance()
      getBalance()
      getTotGames()
      getTotMoneyBetted()
      getGamesWon()
      getMoneyWon()
      getMinimumBet()
      getUniquePlayers()
      getUniquePlayers1()
      startCheckOwner()
    });

    $("#bet0").click(function(){bet = 0;})
    $("#bet1").click(function(){bet = 1;})

    $("#confirm").click(inputData)
    $("#get_data_button").click(fetchAndDisplay)

    $("#withdraw").click(startWithdraw)
    $("#withdrawPlayer").click(startWithdrawPlayer)
    $("#deposit").click(startDepositFunds)

    $("#set_minimumBet").click(setMinimumBet)

    $("#getAddress").click(startGetAddress)

    $("#get_data_button").click(showPlayer)


});

function startCheckOwner(){

contractInstance.methods.checkOwner().call().then(function(res){

if(res == 1){
document.getElementById("hide").style.display="block";

}
})

}


function showPlayer() {
document.getElementById("hidePlayer").style.display="block";
}



function getUniquePlayers(){
contractInstance.methods.TotUniquePlayers().call().then(function(res){                                                    // in una blockchain vera createPerson è lenta, e getPerson è veloce
$("#TotUniquePlayers").text(res);
})};

function getUniquePlayers1(){
contractInstance.methods.TotUniquePlayers().call().then(function(res){                                                    // in una blockchain vera createPerson è lenta, e getPerson è veloce
$("#TotUniquePlayers1").text(res);
})};

function getTotGames(){
contractInstance.methods.TotGames().call().then(function(res){                                                    // in una blockchain vera createPerson è lenta, e getPerson è veloce
$("#TotGames").text(res);
})};
function getTotMoneyBetted(){
contractInstance.methods.TotMoneyBetted().call().then(function(res){                                                    // in una blockchain vera createPerson è lenta, e getPerson è veloce
$("#TotMoneyBetted").text(res);
})};
function getGamesWon(){
contractInstance.methods.TotGamesWon().call().then(function(res){                                                    // in una blockchain vera createPerson è lenta, e getPerson è veloce
$("#TotGamesWon").text(res);
})};
function getMoneyWon(){
contractInstance.methods.TotMoneyWon().call().then(function(res){                                                    // in una blockchain vera createPerson è lenta, e getPerson è veloce
$("#TotMoneyWon").text(res);
})}




function getBalance(){
contractInstance.methods.balance().call().then(function(res){                                                    // in una blockchain vera createPerson è lenta, e getPerson è veloce

$("#balance_output").text(res);
$("#max_bet").text(res/2.5);
})};


function getMinimumBet(){
contractInstance.methods.minBet().call().then(function(res){                                                    // in una blockchain vera createPerson è lenta, e getPerson è veloce

$("#min_bet").text(res);

})};

function getPlayerBalance(){
  contractInstance.methods.getResult().call().then(function(res){          // quando uso un GETTER FUNCTION non devo creare un tx che poi deve essere minata, la blockchain non deve essere cambiata
                                                // in una blockchain vera createPerson è lenta, e getPerson è veloce
  $("#playerBalance_output").text(res.playerBalance);

})}




function startDepositFunds(){

var deposit = $("#depositAmount").val();
contractInstance.methods.depositFunds(deposit).send({value: web3.utils.toWei(deposit, "ether")})
.on("transactionHash", function(hash){
  console.log(hash);
})
.on("confirmation", function(confirmationNr){
  console.log(confirmationNr);
})
.on("receipt", function(receipt){
  getBalance();
  console.log(receipt);
})


}


function startWithdraw(){

var withdraw = $("#withdrawAmount").val();

contractInstance.methods.withdrawFunds(withdraw).send()
.on("transactionHash", function(hash){                                                              //istanza del contratto. methods(funzioni). funzione createPerson
console.log(hash);                                                                // .send dice di firmarla con metamask e inviarla al contratto all'indirizzo dentro contract instance
})                                                                // in config specifico che devo mandare 1 ether per createPerson
.on("confirmation", function(confirmationNr){          // .on() funzione che quando riceve tx hash esegue una funzione (quando ci da txhash, block confirmation, receipt = quando tx è messa in un blocco per la prima volta)
console.log(confirmationNr);
})

.on("receipt", function(receipt){
  getBalance();
  console.log(receipt);
})


}

function startWithdrawPlayer(){

var withdraw = $("#withdrawPlayerAmount").val();

contractInstance.methods.withdrawFundsPlayer(withdraw).send()
.on("transactionHash", function(hash){                                                              //istanza del contratto. methods(funzioni). funzione createPerson
console.log(hash);                                                                // .send dice di firmarla con metamask e inviarla al contratto all'indirizzo dentro contract instance
})                                                                // in config specifico che devo mandare 1 ether per createPerson
.on("confirmation", function(confirmationNr){          // .on() funzione che quando riceve tx hash esegue una funzione (quando ci da txhash, block confirmation, receipt = quando tx è messa in un blocco per la prima volta)
console.log(confirmationNr);
})
.on("receipt", function(receipt){
console.log(receipt);
getPlayerBalance();
alert("done");
})

}


function setMinimumBet(){

var config = {value: web3.utils.toWei("1", "ether")}   // definisco config del valore di 1 ether

var amount = $("#minBetAmount").val();

contractInstance.methods.minimumBet(amount).send() // metto input dentro funzione del CONTRATTO
.on("transactionHash", function(hash){                                                              //istanza del contratto. methods(funzioni). funzione createPerson
console.log(hash);                                                                // .send dice di firmarla con metamask e inviarla al contratto all'indirizzo dentro contract instance
})                                                                // in config specifico che devo mandare 1 ether per createPerson
.on("confirmation", function(confirmationNr){          // .on() funzione che quando riceve tx hash esegue una funzione (quando ci da txhash, block confirmation, receipt = quando tx è messa in un blocco per la prima volta)
console.log(confirmationNr);
})
.on("receipt", function(receipt){
console.log(receipt);
getMinimumBet();
alert("done");
})

getMinimumBet()

}

function startGetAddress(){



var config = {value: web3.utils.toWei("1", "ether")}   // definisco config del valore di 1 ether

var array = $("#address").val();


contractInstance.methods.getAddress(array).call().then(function(res){                                                    // in una blockchain vera createPerson è lenta, e getPerson è veloce

$("#addressResult").text(res);



contractInstance.methods.getStatistics(res).call().then(function(res){


$("#playerGames").text(res.games);
$("#playerMoneyBetted").text(res.moneyBetted);
$("#playerGamesWon").text(res.gamesWon);
$("#PlayerMoneyWon").text(res.moneyWon);

})



})
}


function inputData(){


var config = {
value: web3.utils.toWei("1", "ether")}

var amount = $("#amount").val();

contractInstance.methods.setBet(amount, bet).send({value: web3.utils.toWei(amount, "ether")}) // così evito di scrivere 1000000000000
.on("transactionHash", function(hash){
console.log(hash);
})
.on("confirmation", function(confirmationNr){
console.log(confirmationNr);
})
.on("receipt", function(receipt){
console.log(receipt);
getBalance();
getPlayerBalance();
getTotGames();
getTotMoneyBetted();
getGamesWon();
getMoneyWon();
getUniquePlayers();
})
}




  function fetchAndDisplay(){    // deve prendere i dati dalla blockchain e poi deve mostrarli
  contractInstance.methods.getResult().call().then(function(res){          // quando uso un GETTER FUNCTION non devo creare un tx che poi deve essere minata, la blockchain non deve essere cambiata
                                                // in una blockchain vera createPerson è lenta, e getPerson è veloce

$("#amount_output").text(res.amount);
$("#bet_output").text(res.bet);
$("#message_output").text(res.message);
$("#result_output").text(res.result);


$("#yourGames").text(res.games);
$("#yourMoneyBetted").text(res.moneyBetted);
$("#yourGamesWon").text(res.gamesWon);
$("#YourMoneyWon").text(res.moneyWon);
})
  }










//  function displayBalance(){    // deve prendere i dati dalla blockchain e poi deve mostrarli       // quando uso un GETTER FUNCTION non devo creare un tx che poi deve essere minata, la blockchain non deve essere cambiata
  //  let res = contractInstance.balance();                                       // in una blockchain vera createPerson è lenta, e getPerson è veloce
// $("#balance_output").text(res);
//  }
