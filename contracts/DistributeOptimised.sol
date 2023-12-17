    // SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract DistributeOptimised {
    address[6] public contributors;
    uint256 public createTime;

    constructor(address[6] memory _contributors) payable {
        createTime = block.timestamp;
        contributors = _contributors;
    }

    function distribute() external {
        require(block.timestamp > createTime + 2 weeks, "cannot call distribute yet");
        uint256 amount;
        bool success;
        assembly {
            amount := div(selfbalance(), 6)
            for { let i := 0 } lt(i, 6) { i := add(i, 1) } { success := call(gas(), sload(i), amount, 0, 0, 0, 0) }
        }
        require(success, "Failed to send ETH");
    }
}
