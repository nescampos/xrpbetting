// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


import {FtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/FtsoV2Interface.sol";
import {IFeeCalculator} from "@flarenetwork/flare-periphery-contracts/coston2/IFeeCalculator.sol";

contract FXUSDFeedConsumer {
    FtsoV2Interface internal ftsoV2;
    IFeeCalculator internal feeCalc;
    bytes21[] public feedIds;
    bytes21 public xrpUsdId;
    uint256 public fee;

    constructor(address _ftsoV2, address _feeCalc, bytes21 _xrpUsdId) {
        ftsoV2 = FtsoV2Interface(_ftsoV2);
        feeCalc = IFeeCalculator(_feeCalc);
        xrpUsdId = _xrpUsdId;
        feedIds.push(_xrpUsdId);
    }

    function checkFees() external returns (uint256 _fee) {
        fee = feeCalc.calculateFeeByIds(feedIds);
        return fee;
    }

    function getXrpUsdPrice() external payable returns (uint256, int8, uint64) {
        (uint256 feedValue, int8 decimals, uint64 timestamp) = ftsoV2
            .getFeedById{value: msg.value}(xrpUsdId);

        return (feedValue, decimals, timestamp);
    }
}