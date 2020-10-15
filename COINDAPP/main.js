var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, "0x6623444594c3555F9652AD1ed273f8317a55b35f", {from: accounts[0]});
      console.log(contractInstance);
    });

    $("#confirm").click(inputData)
    $("#get_data_button").click(fetchAndDisplay)

});

function inputData(){
var amount = $("#amount").val();
var hot = $("#hot").val();


var config = {
value: web3.utils.toWei("1", "ether")}   // definisco config del valore di 1 ether

contractInstance.methods.setBet(amount, hot).send() // metto input dentro funzione del CONTRATTO
.on("transactionHash", function(hash){                                                              //istanza del contratto. methods(funzioni). funzione createPerson
console.log(hash);                                                                // .send dice di firmarla con metamask e inviarla al contratto all'indirizzo dentro contract instance
})                                                                // in config specifico che devo mandare 1 ether per createPerson
.on("confirmation", function(confirmationNr){          // .on() funzione che quando riceve tx hash esegue una funzione (quando ci da txhash, block confirmation, receipt = quando tx è messa in un blocco per la prima volta)
console.log(confirmationNr);
})
.on("receipt", function(receipt){
console.log(receipt);
alert("done");
})
}



  function fetchAndDisplay(){    // deve prendere i dati dalla blockchain e poi deve mostrarli
  contractInstance.methods.getResult().call().then(function(res){          // quando uso un GETTER FUNCTION non devo creare un tx che poi deve essere minata, la blockchain non deve essere cambiata
                                                // in una blockchain vera createPerson è lenta, e getPerson è veloce

$("#amount_output").text(res.amount);
$("#hot_output").text(res.hot);
$("#message_output").text(res.s);
$("#result_output").text(res.r);
})
  }
