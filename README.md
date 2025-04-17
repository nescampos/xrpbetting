# XRPBetting

XRPBetting is a system that allows anyone to bet for or against the price of XRP using Flare to obtain the information in a decentralized and secure way.


## Demo

Testnet: https://nescampos.github.io/xrpbetting/

- XRPBetting Contract: [0x3F719F49b7d2401f4e14675496eb7841F80AAa95](https://coston2-explorer.flare.network/address/0x3F719F49b7d2401f4e14675496eb7841F80AAa95)
- Feed Consumer (for XRP/USD price): [0x3258814758AC48fE9c0869d43Df8F13aD0cB2A25](https://coston2-explorer.flare.network/address/0x3258814758AC48fE9c0869d43Df8F13aD0cB2A25)


## How works?
XRPBetting works in testnet (**Coston2**) as follows:

1. The contract owner creates a round for a new bet, setting the end date (timestamp) until which bets can be placed.
- This action calls the FXUSDFeedConsumer contract I created to retrieve the value from Flare Data Connector for the _XRP/USD_ pair. Therefore, the call must include a payout for the connector and ensure success.
- The result of that call (the value of XRP in USD) will be stored to establish the round, as the starting value, and bets must be for or against the raise for that value.

2. Any Flare account can deposit a certain amount of FLR for a particular round. The entire prize pool will be awarded to the winning side after settlement.
3. When the end date (at the time the round is created) arrives, any user can settle the round to close it and decide the winning side.
- This action also sends a small payment, as the action will call back to the Feed Consumer to obtain the XRP value in USD.

4. Any user on the winning side will be able to withdraw their share of the prizes within the round.

## Contracts

The XRPBetting contract (_XRPBetting.sol_) and the XRP/USD Feed Consumer contract (_FXUSDFeedConsumer.sol_) are available in the [contracts](./contracts) folder.

## Using Flare Data Connector (FDC)
The [Flare Data Connector](https://flare.network/products/flare-data-connector) was used to obtain the XRP/USD value because it's very simple, requiring only setting up a contract to serve as a feed consumer and manage the data. Any other contract can then call this feed consumer, paying a small fee to the connector that returns the information.

## Pending

The following points are pending improvement:
- Calculate rewards proportionally to the amount placed in the bet.
- Automate the round settlement to obtain the final XRP price at the exact moment.
- Add a staking deadline so there is no incentive to place the bet only at the end of the process.

