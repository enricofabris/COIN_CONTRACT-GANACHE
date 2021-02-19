const coin3 = artifacts.require("coin3");
const truffleAssert = require("truffle-assertions");

contract("coin3", async function(accounts){   // definisco quale contratto uso per fare il test


// bet should be 0 or 1
it("SHOULD GET ONLY 0 OR 1 AS BET", async function(){
let instance = await coin3.deployed();
await truffleAssert.fails(   // test PASS SE C'E' ERRORE -> PASS VUOL DIRE CHE TX E' STATA FREVERTED
  instance.setBet(2, 3, {value: web3.utils.toWei("1", "ether")}), truffleAssert.ErrorType.REVERT) // COSI DA ERRORE SOLO IN RELAZIONE A REVERT
});
// sending less than the amount defined in the bet revert the tx
it("SHOULD PAY THE AMOUNT ETH TO SET THE BET", async function(){
let instance = await coin3.deployed();
await truffleAssert.fails(
  instance.setBet(2, 1, {from: accounts[1], value: web3.utils.toWei("1", "ether")}), truffleAssert.ErrorType.REVERT);// MANDO 1 ETH INVECE DI 2
});

it("balance", async function(){
  let instance = await coin3.deployed();
  await truffleAssert.passes(
    instance.balance() > 10);
});






// CHECK ONLYOWNER
it("non owner can't set minimumBet", async function(){
  let instance = await coin3.deployed();

  await truffleAssert.fails(
    instance.minimumBet(2, {from: accounts[1]}), truffleAssert.ErrorType.REVERT);
});
it("owner can set minimumBet", async function(){
  let instance = await coin3.deployed();

  await truffleAssert.passes(
    instance.minimumBet(2, {from: accounts[0]}));
});

it("non owner can't withdraw from contract", async function(){
  let instance = await coin3.deployed();

  await truffleAssert.fails(
    instance.withdrawFunds(1, {from: accounts[1]}), truffleAssert.ErrorType.REVERT);
});
it("owner can withdraw from contract", async function(){
  let instance = await coin3.deployed();

  await truffleAssert.passes(
    instance.withdrawFunds(1, {from: accounts[0]}));
});

it("non owner can't deposit in the contract", async function(){
  let instance = await coin3.deployed();

  await truffleAssert.fails(
    instance.depositFunds(1, {from: accounts[1], value: web3.utils.toWei("1", "ether")}), truffleAssert.ErrorType.REVERT);
});
it("owner can deposit in the contract", async function(){
  let instance = await coin3.deployed();

  await truffleAssert.passes(
    instance.depositFunds(1, {from: accounts[0], value: web3.utils.toWei("1", "ether")}));
});




// bet over minimum bet previously set at 2 eth
it("bet amount has to be over minimum bet", async function(){
let instance = await coin3.deployed();
await truffleAssert.fails(
  instance.setBet(1, 0, {value: web3.utils.toWei("1", "ether")}), truffleAssert.ErrorType.REVERT);
});
// bet over over the half of contract balance (9eth) can't go through
it("bet amount has to be under maximum bet", async function(){
let instance = await coin3.deployed();
await truffleAssert.fails(
  instance.setBet(5, 0, {value: web3.utils.toWei("5", "ether")}), truffleAssert.ErrorType.REVERT);
});
  // CHECK COST MODIFIER
it("setBet require to be paid the right amount", async function(){
  let instance = await coin3.deployed();

  await truffleAssert.fails(
  instance.setBet(3, 0, {value: web3.utils.toWei("1", "ether")}), truffleAssert.ErrorType.REVERT);
});



});
