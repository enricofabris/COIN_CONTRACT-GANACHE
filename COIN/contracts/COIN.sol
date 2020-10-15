import "./ownable.sol";
pragma solidity 0.5.16;

 contract HelloWorld is Ownable{

    struct player {
      uint amount;
      uint hot;
    }

    uint public balance;
    uint public minBet;
    uint public result;

    string public message = "";

    modifier costs(uint cost){
        require(msg.value >= cost);
        _;
    }

    constructor() public payable{
    require(msg.value >= 2*1000000000000000000);
       balance += msg.value;
}



    mapping (address => player) private players;
    // address[] private playersArr;



// link amount player want ot pay to his address
    function setBet(uint amount, uint hot) public payable costs( (players[msg.sender].amount)*1000000000000000000 ){


        require(hot == 1 || hot == 0);

        player memory newPlayer;
        newPlayer.amount = amount;
        newPlayer.hot = hot;

        insertPlayer(newPlayer);
        // playersArr.push(msg.sender);
        require((players[msg.sender].amount)*1000000000000000000 >= minBet*1000000000000000000, "Bet under minimum bet");
        require((players[msg.sender].amount)*1000000000000000000 <= balance/2, "Bet over contract funds");



      if(random() == (players[msg.sender].hot)){
        balance = balance - (players[msg.sender].amount)*1000000000000000000*2;
       msg.sender.transfer( (players[msg.sender].amount)*1000000000000000000*2 );

       message = "WIN";
       result = random();
         }
        else{

        message ="LOSE";
        result = random();

        }

        //maxBet = balance/2;

        balance += msg.value;
        }


// coin win or lose
    function random() public view returns(uint){
    return now % 2;
    }

   function getResult() public view returns(uint amount, uint hot, string memory s, uint r){
        address creator = msg.sender; // salvo indirizzo di chi da input in variabile creator
        s = message;
        r = result;
        return (players[creator].amount, players[creator].hot, s, r);
    }

// only owner can withdraw money
    function withdrawFunds(uint withdraw) public onlyOwner {

       balance = balance - withdraw*1000000000000000000;
       msg.sender.transfer(withdraw*1000000000000000000);
       //maxBet = balance/2;
   }

  function insertPlayer(player memory newPlayer) private {
        address creator = msg.sender; // variabile creator contiene address del giocatore
        players[creator] = newPlayer;  // collego player al suo address
    }



}
