// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./FXUSDFeedConsumer.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";



contract XRPBetting is Ownable {
    FXUSDFeedConsumer public feedConsumer;

    // Structure to represent each individual bet.
    struct Bet {
        address bettor;
        bool betIsDown;  // true: bet that the price will go down; false: bet that it will not go down.
        uint256 amount;
        bool claimed; 
    }

    // Structure to represent a betting round.
    struct Round {
        uint256 id;
        uint256 settlementTime;
        uint256 referencePrice; 
        uint64 referenceTimestamp;
        uint256 finalPrice;
        bool bettingOpen;
        bool settled;
        uint256 totalDown; 
        uint256 totalUp;
        Bet[] bets; 
    }

    

    Round[] public rounds;

    // Anti-reentrancy pattern (very basic).
    bool private locked;

    uint32 public roundsLength;

    // Events for monitoring operations.
    event RoundCreated(uint256 indexed roundId, uint256 referencePrice, uint256 settlementTime);
    event BetPlaced(uint256 indexed roundId, address indexed bettor, uint256 amount, bool betDown);
    event RoundSettled(uint256 indexed roundId, uint256 finalPrice, bool resultDown);
    event WinningsWithdrawn(uint256 indexed roundId, address indexed bettor, uint256 amount);


    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }

    constructor(address _feedConsumer) Ownable(msg.sender) {
        feedConsumer = FXUSDFeedConsumer(_feedConsumer);
        roundsLength = 0;
    }

    function createRound(uint256 _settlementTime) external payable onlyOwner {
        require(_settlementTime > block.timestamp, "The settlement date must be in the future");

        // Obtaining the reference price.
        (uint256 price, int8 decimals, uint64 timestamp) = feedConsumer.getXrpUsdPrice{value: msg.value}();

        // The new round is created.
        Round storage newRound = rounds.push();
        newRound.id = rounds.length;
        newRound.settlementTime = _settlementTime;
        newRound.referencePrice = price;
        newRound.referenceTimestamp = timestamp;
        newRound.bettingOpen = true;
        newRound.settled = false;
        roundsLength += 1;

        emit RoundCreated(newRound.id, newRound.referencePrice, _settlementTime);
    }

    function placeBet(uint256 roundId, bool betDown) external payable {
        require(roundId < rounds.length, "Round does not exist");
        Round storage round = rounds[roundId];
        require(round.bettingOpen, "Betting is not open on this round.");
        require(block.timestamp < round.settlementTime, "Betting time has already ended for this round");
        require(msg.value > 0, "The bet amount must be greater than 0");

        // The bet is registered.
        round.bets.push(Bet({
            bettor: msg.sender,
            betIsDown: betDown,
            amount: msg.value,
            claimed: false
        }));

        // The amount is accumulated in the corresponding pool.
        if (betDown) {
            round.totalDown += msg.value;
        } else {
            round.totalUp += msg.value;
        }

        emit BetPlaced(roundId, msg.sender, msg.value, betDown);
    }

    function settleRound(uint256 roundId) external payable {
        require(roundId < rounds.length, "Round does not exist");
        Round storage round = rounds[roundId];
        require(block.timestamp >= round.settlementTime, "Settlement cannot be made before the defined date.");
        require(!round.settled, "The settlement has already been made");

        // The betting round is closed.
        round.bettingOpen = false;

        // The final price is obtained using the feed.
        (uint256 price, int8 decimals, uint64 timestamp) = feedConsumer.getXrpUsdPrice{value: msg.value}();
        round.finalPrice = price;
        round.settled = true;

        bool resultadoSiBaja = (round.finalPrice < round.referencePrice);
        emit RoundSettled(roundId, round.finalPrice, resultadoSiBaja);
    }

    function withdrawWinnings(uint256 roundId) external noReentrant {
        require(roundId < rounds.length, "Round does not exist");
        Round storage round = rounds[roundId];
        require(round.settled, "The settlement has not yet been made");

        // Determine winning side
        bool winningSide = (round.finalPrice < round.referencePrice);
        uint256 totalWinnings = 0;

        // Go through all the bets in the round.
        for (uint256 i = 0; i < round.bets.length; i++) {
            Bet storage betEntry = round.bets[i];
            if (
                betEntry.bettor == msg.sender &&
                !betEntry.claimed &&
                betEntry.betIsDown == winningSide
            ) {
                uint256 payout = betEntry.amount;
                // Calculation of the proportional bonus, if there is a bet in the losing pool.
                uint256 winningPool = winningSide ? round.totalDown : round.totalUp;
                uint256 losingPool = winningSide ? round.totalUp : round.totalDown;
                if (winningPool > 0 && losingPool > 0) {
                    payout += (betEntry.amount * losingPool) / winningPool;
                }
                totalWinnings += payout;
                betEntry.claimed = true;
            }
        }
        require(totalWinnings > 0, "You have no earnings to withdraw");

        (bool sent, ) = msg.sender.call{value: totalWinnings}("");
        require(sent, "Payment failed to send");

        emit WinningsWithdrawn(roundId, msg.sender, totalWinnings);
    }

    function getAllRounds() public view returns(Round[] memory) {
        return rounds;
    }

    function getBetsByRound(uint256 roundId) public view returns (Bet[] memory){
        require(roundId < rounds.length, "Round does not exist");
        return rounds[roundId].bets;
    }
}
