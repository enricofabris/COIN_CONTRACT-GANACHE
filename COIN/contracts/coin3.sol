import "./Ownable.sol";
pragma solidity 0.5.16;

contract coin3 is Ownable{

    struct player {
      uint amount;
      uint bet;
      string message;                       // message after flip: WIN or LOSE
      uint result;                                     // result of the coin flip return from Provable
      uint playerBalance;
      uint games;
      uint moneyBetted;
      uint gamesWon;
      uint moneyWon;
    }

    uint public balance;
    uint public minBet;

    uint public TotGames;
    uint public TotMoneyBetted;
    uint public TotGamesWon;
    uint public TotMoneyWon;
    uint public TotUniquePlayers;

    uint public hide;


function checkOwner() public returns(uint){
       if(msg.sender == owner){
       hide = 1;
       }
       else {
       hide = 0;
       }

       return hide;
    }


    modifier costs(uint cost){
        require(msg.value >= cost);
        _;
    }

    constructor() public payable{
    require(msg.value >= 9*1000000000000000000);
       balance += msg.value;
       addresses.push(msg.sender);
       addressesFilter.push(msg.sender);
}




function minimumBet(uint minimum) public onlyOwner returns(uint){
       minBet = minimum;
       return minBet;
    }

    mapping (address => player) private players;
    // address[] private playersArr;

    address[] private addresses;
    address[] private addressesFilter;

    event betEvent(uint bet);

// link amount player want ot pay to his address
    function setBet(uint amount, uint bet) public payable costs( (amount)*1000000000000000000 ){


        require(bet == 1 || bet == 0);

        player memory newPlayer;
        newPlayer.amount = amount;
        newPlayer.bet = bet;

        // i dati che voglio non vengano perduti tra una bet e l'altra li devo salvare nel mapping

        newPlayer.playerBalance = players[msg.sender].playerBalance;
        newPlayer.games = players[msg.sender].games;
        newPlayer.moneyBetted = players[msg.sender].moneyBetted;
        newPlayer.gamesWon = players[msg.sender].gamesWon;
        newPlayer.moneyWon = players[msg.sender].moneyWon;

        addresses.push(msg.sender);



        uint i = 0;
        uint counter = 0;

        for(i=0; i<addressesFilter.length; i++){

            if(msg.sender == addressesFilter[i]){

            counter = counter + 1;

            }
        }

        if(counter < 1){

            addressesFilter.push(msg.sender);
            }








        insertPlayer(newPlayer);
        // playersArr.push(msg.sender);

        require((players[msg.sender].amount)*1000000000000000000 >= minBet*1000000000000000000, "Bet under minimum bet");
        require((players[msg.sender].amount)*1000000000000000000 <= balance/2, "Bet over contract funds");



        balance += msg.value;



      if(random() == (players[msg.sender].bet)){
        balance = balance - (players[msg.sender].amount)*1000000000000000000*2;
       players[msg.sender].playerBalance = players[msg.sender].playerBalance + (players[msg.sender].amount)*1000000000000000000*2;

       players[msg.sender].message = "WIN";
       players[msg.sender].result = random();

       players[msg.sender].gamesWon = players[msg.sender].gamesWon + 1;
       players[msg.sender].moneyWon = players[msg.sender].moneyWon + (players[msg.sender].amount)*1000000000000000000;

       TotGamesWon = 1 + TotGamesWon;
       TotMoneyWon = (players[msg.sender].amount)*1000000000000000000 + TotMoneyWon;

        }

        else{

        players[msg.sender].message ="LOSE";
        players[msg.sender].result = random();

        }

        players[msg.sender].games = players[msg.sender].games + 1;
        players[msg.sender].moneyBetted = players[msg.sender].moneyBetted + (players[msg.sender].amount)*1000000000000000000;
        //maxBet = balance/2;


        TotGames = addresses.length -1;
        TotMoneyBetted = players[msg.sender].amount + TotMoneyBetted;
        TotUniquePlayers = addressesFilter.length -1;


        emit betEvent(players[msg.sender].result);

        }






// coin win or lose
    function random() public view returns(uint){
    return now % 2;
    }


function getResult() public view returns(uint amount, uint bet, string memory message, uint result, uint playerBalance, uint games, uint moneyBetted, uint gamesWon, uint moneyWon){
         address creator = msg.sender;

         return (players[creator].amount, players[creator].bet, players[creator].message, players[creator].result, players[creator].playerBalance, players[creator].games, players[creator].moneyBetted, players[creator].gamesWon, players[creator].moneyWon );
     }


function depositFunds(uint deposit) public payable onlyOwner costs( deposit*1000000000000000000 ){

    balance = balance + deposit*1000000000000000000;

}



// only owner can withdraw money
    function withdrawFunds(uint withdraw) public onlyOwner {

       balance = balance - withdraw*1000000000000000000;
       msg.sender.transfer(withdraw*1000000000000000000);
       //maxBet = balance/2;
   }



   function withdrawFundsPlayer(uint withdraw) public {
   require(withdraw<players[msg.sender].playerBalance);

   players[msg.sender].playerBalance = players[msg.sender].playerBalance - (withdraw*1000000000000000000);
   msg.sender.transfer(withdraw*1000000000000000000);


   }
  function insertPlayer(player memory newPlayer) private {
        address creator = msg.sender; // variabile creator contiene address del giocatore
        players[creator] = newPlayer;  // collego player al suo address
    }



function getStatistics(address infoaddress) public view onlyOwner returns(uint games, uint moneyBetted, uint gamesWon, uint moneyWon){


         return (players[infoaddress].games, players[infoaddress].moneyBetted, players[infoaddress].gamesWon, players[infoaddress].moneyWon );
     }

function getAddress(uint number) public view onlyOwner returns(address infoaddress){

         infoaddress = addressesFilter[number];

         return (infoaddress);
     }




}
