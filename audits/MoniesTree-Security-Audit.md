# MoniesTree Security Review

## Introduction

A time-boxed security review of the **MoniesTree** protocol was conducted by **Stonewall**, with a focus on the security aspects of the smart contract implementation.

## Disclaimer

A smart contract security review can never verify the complete absence of vulnerabilities. This is a time, resource and expertise bound effort where we try to find as many vulnerabilities as possible. We can not guarantee 100% security after the review or even if the review will find any problems with your smart contracts. Subsequent security reviews, bug bounty programs and on-chain monitoring are strongly recommended.

## About Stonewall

Stonewall is an independent smart contract security firm delivering immovable protection for Web3 protocols. Our team brings deep expertise in DeFi security, having reviewed DEXs, yield farming protocols, gaming contracts, and complex financial systems.

## About MoniesTree

MoniesTree (also known as "Bloom") is a DeFi protocol on PulseChain featuring:

- **Auction System**: 35-day daily auction where users deposit ETH/PLS to acquire tokens
- **Token Vesting**: Auction participants receive vested tokens with 3% daily emissions (up to 111% return)
- **Staking & Rewards**: Users stake MT tokens to earn rewards from reserve pool
- **Buy-Back & Liquidity**: 85% of collected ETH used to buy back tokens and build liquidity
- **Reserve Management**: Tax and buyback proceeds split between staking rewards and auction reserves

### Privileged Roles & Actors

| Role | Description |
|------|-------------|
| Admin | Full control over protocol parameters, can pause auctions, set taxes (up to 10% buy/15% sell), change addresses |
| Team | Can set taxes, pause rewards, adjust slippage, manage exclusions |
| Fee Recipient | Receives 15% of collected ETH from daily auctions |

### Observations

- Complex three-contract architecture with tight coupling
- Auction mechanism with configurable "day" duration (currently 4 hours)
- LP tokens are permanently burned (sent to zero address)
- No timelock or multisig on admin functions
- Reserve system distributes buyback proceeds to stakers and future auctions

---

## Risk Classification

|                | High Impact     | Medium Impact  | Low Impact     |
|----------------|-----------------|----------------|----------------|
| High Likelihood| Critical        | High           | Medium         |
| Medium Likelihood| High          | Medium         | Low            |
| Low Likelihood | Medium          | Low            | Low            |

### Impact

- **High**: Leads to significant loss of user funds, protocol insolvency, or complete protocol failure
- **Medium**: Leads to partial loss of funds, temporary denial of service, or governance manipulation
- **Low**: Leads to minor issues, inconvenience, or suboptimal behavior

### Likelihood

- **High**: Attack is easy to perform and likely to happen
- **Medium**: Attack requires specific conditions but is feasible
- **Low**: Attack requires significant effort, resources, or unlikely conditions

---

## Security Assessment Summary

| Review Details | |
|----------------|---|
| **Protocol Name** | MoniesTree |
| **Repository** | Private |
| **Commit** | N/A |
| **Review Date** | January 2026 |
| **Methods** | Manual review, static analysis |
| **Network** | PulseChain Mainnet |

### Deployed Contract Addresses

| Contract | Address |
|----------|---------|
| MoniesTree (Main Token) | `0x7c5619488a5bf0B2e26c6bD674e436c716DD4761` |
| StakeContract | `0x23658664B35E39ac488f5d4Dcf493f7E854e835D` |
| ReserveContract | `0x5578e02101284b303455d1b77B98BabB81f3A2be` |
| ViewCA (AuctionMulticall) | `0x235C98dFcFd82f520704cD57841998D282699163` |
| ViewCAVest (VestingMulticall) | `0x5Fef082c5b3999Cb2d2Ebd4815f3c8CB9bfE9902` |

### Project Links

| Platform | Link |
|----------|------|
| Website | N/A |
| DEX | PulseX V2 |

### Scope

| Contract | SLOC |
|----------|------|
| `MoniesTree.sol` | ~650 |
| `StakeContract` (embedded) | ~280 |
| `ReserveContract` (embedded) | ~190 |

---

## Findings Summary

| ID | Title | Severity | Status |
|----|-------|----------|--------|
| [C-01] | Unbounded loop in updateRewards() causes permanent DoS | Critical | Open |
| [H-01] | Admin can pause auctions indefinitely and trap user ETH | High | Open |
| [H-02] | No slippage protection on initial liquidity addition | High | Open |
| [M-01] | Integer division precision loss in reserve splits | Medium | Open |
| [M-02] | Staking lock period inconsistent with documentation | Medium | Open |
| [M-03] | Missing zero-address checks on critical setters | Medium | Open |
| [L-01] | SafeMath unnecessary in Solidity 0.8+ | Low | Open |
| [L-02] | Missing events for critical state changes | Low | Open |
| [L-03] | LP tokens permanently burned without recovery option | Low | Open |

---

## Detailed Findings

### [C-01] Unbounded Loop in updateRewards() Causes Permanent DoS

**Severity:** Critical

**Location:** `StakeContract.sol:467-469`

**Description:**

The `updateRewards()` function iterates through ALL stakers in the `allStakers` array to update their pending rewards:

```solidity
// Loop through all users and update their pending rewards
for (uint256 i = 0; i < allStakers.length; i++) {
    updateUserRewards(allStakers[i]);
}
```

As the number of stakers grows, this loop will eventually exceed the block gas limit, making the function uncallable. Since `updateRewards()` is called by `deposit()`, `withdraw()`, `claimRewards()`, and `compoundRewards()`, the entire staking system will become permanently unusable.

**Impact:**

- Complete denial of service for all staking operations
- Users unable to withdraw their staked tokens
- Users unable to claim accumulated rewards
- Protocol becomes unusable after sufficient user adoption

**Recommendation:**

Implement a pull-based reward system where users update only their own rewards:

```solidity
function updateRewards() public {
    uint256 currentDay = _auction.readCurrentDay();
    if (!rewardsActive || lastRewardDay >= currentDay || rewardsPaused) return;

    // Update global state only
    for (uint256 day = lastRewardDay; day < currentDay; day++) {
        // ... existing reward calculation per day
    }
    lastRewardDay = currentDay;
}

// Users call this to update their own rewards
function updateMyRewards() public {
    updateUserRewards(msg.sender);
}
```

---

### [H-01] Admin Can Pause Auctions Indefinitely and Trap User ETH

**Severity:** High

**Location:** `MoniesTree.sol:1268-1287`

**Description:**

The admin can pause auctions via `pauseUnpauseAuctions()`. While paused:
- Users cannot enter new auctions
- Users who already deposited ETH for future days cannot claim tokens
- The `buybackAndBuild()` function requires auctions to be unpaused
- ETH remains trapped in the contract

Although `permanentlyDisableAuctionPause()` exists, it can only be called when auctions are active, and there's no mechanism to force the admin to call it.

**Impact:**

- Users' ETH deposits can be held hostage
- Admin can manipulate auction timing for personal gain
- No recourse for users if admin becomes malicious or loses keys

**Recommendation:**

1. Add maximum pause duration with automatic unpause
2. Implement timelock for pause functionality
3. Allow users to withdraw their auction deposits if paused beyond threshold

---

### [H-02] No Slippage Protection on Initial Liquidity Addition

**Severity:** High

**Location:** `MoniesTree.sol:1310-1319`

**Description:**

The `addFirstDaysLiq()` function adds initial liquidity with zero slippage protection:

```solidity
(, , uint256 amtLiquidity) = _router.addLiquidityETH{
    value: collectedETHtoLiq
}(
    contrAddr,
    amountAuctionTokenToAdd,
    0, // amountTokenMin = 0 ❌
    0, // amountETHMin = 0 ❌
    contrAddr,
    block.timestamp + 100
);
```

**Impact:**

- Sandwich attack can steal significant value during initial liquidity provision
- MEV bots can front-run the transaction and extract value
- First-day auction participants receive less value than expected

**Recommendation:**

Calculate minimum amounts based on expected price:

```solidity
uint256 amountTokenMin = amountAuctionTokenToAdd * 95 / 100;
uint256 amountETHMin = collectedETHtoLiq * 95 / 100;
```

---

### [M-01] Integer Division Precision Loss in Reserve Splits

**Severity:** Medium

**Location:** Multiple locations

**Description:**

Several places divide amounts by 2 or other values, losing precision:

```solidity
// MoniesTree.sol:1108-1109
taxBuyBackReserveContract.updateReserveAuction(true, tokenAmount / 2);
taxBuyBackReserveContract.updateReserveStake(true, tokenAmount / 2);

// MoniesTree.sol:1159
uint256 taxAmount = amount.mul(taxPercent).div(10000);

// MoniesTree.sol:1172-1173
taxBuyBackReserveContract.updateReserveAuction(true, taxAmount / 2);
taxBuyBackReserveContract.updateReserveStake(true, taxAmount / 2);
```

For odd amounts, 1 wei is lost per split. Over many transactions, this accumulates.

**Impact:**

- Slow token leak over time
- Reserve balances don't match expected values
- Minor accounting discrepancies

**Recommendation:**

Track remainder and distribute it:

```solidity
uint256 half = tokenAmount / 2;
uint256 remainder = tokenAmount - (half * 2);
taxBuyBackReserveContract.updateReserveAuction(true, half + remainder);
taxBuyBackReserveContract.updateReserveStake(true, half);
```

---

### [M-02] Staking Lock Period Inconsistent with Documentation

**Severity:** Medium

**Location:** `StakeContract.sol:335`

**Description:**

The code defines:
```solidity
uint256 public stakeLockTime = 7 days; // TODO change to 7 days
```

However, comments throughout the codebase reference different time periods:
- `oneDay = 4 hours` in the main contract
- "7 x 4-hour cycles = 28 hours" mentioned in docs

If `oneDay` is actually 4 hours, users expect 28-hour locks but get 7-day locks.

**Impact:**

- Users locked longer than expected
- Trust issues with the protocol
- Potential for user funds to be trapped

**Recommendation:**

Align lock period with actual day duration:
```solidity
uint256 public stakeLockTime = 7 * oneDay; // Consistent with protocol's day definition
```

---

### [M-03] Missing Zero-Address Checks on Critical Setters

**Severity:** Medium

**Location:** `MoniesTree.sol:1075-1081`

**Description:**

The `setAdminAddresses()` function allows setting admin and fee recipient to any address, including zero address:

```solidity
function setAdminAddresses(
    address payable admin,
    address payable feeRecipient
) external onlyAdmin {
    _admin = admin;
    _feeRecipient = feeRecipient;
}
```

**Impact:**

- Setting admin to zero address permanently locks all admin functions
- Setting fee recipient to zero address burns 15% of all ETH collected
- Irreversible loss of protocol control

**Recommendation:**

```solidity
require(admin != address(0), "Invalid admin");
require(feeRecipient != address(0), "Invalid fee recipient");
```

---

### [L-01] SafeMath Unnecessary in Solidity 0.8+

**Severity:** Low

**Location:** Throughout all contracts

**Description:**

The contracts use SafeMath library despite being Solidity 0.8.0+, which has built-in overflow/underflow protection. This adds unnecessary gas costs.

**Recommendation:**

Remove SafeMath and use native arithmetic operators.

---

### [L-02] Missing Events for Critical State Changes

**Severity:** Low

**Location:** Multiple functions

**Description:**

Several important state changes don't emit events:
- `setBuyAndSellTax()` - tax rate changes
- `setAdminAddresses()` - admin/fee recipient changes
- `setExcludedFromTax()` - tax exclusion changes
- `permanentlyDisableAuctionPause()` - permanent state change

**Impact:**

- Reduced transparency for users monitoring the protocol
- Difficult to track historical changes
- Limits off-chain monitoring capabilities

**Recommendation:**

Add appropriate events for all state-changing functions.

---

### [L-03] LP Tokens Permanently Burned Without Recovery Option

**Severity:** Low

**Location:** `MoniesTree.sol:1326`

**Description:**

Initial LP tokens are transferred to the zero address:

```solidity
IERC20(liquidityPoolAddress).transfer(address(0), amtLiquidity);
```

**Impact:**

- LP tokens are permanently lost
- Cannot remove liquidity in emergency
- No upgrade path if issues are discovered

**Recommendation:**

Consider sending to a dead address controlled by a multisig or DAO for potential future governance decisions, or implement a burn function that emits an event for tracking.

---

## Centralization Risks

| Risk | Description | Severity |
|------|-------------|----------|
| Admin Key Compromise | Single admin controls all protocol parameters | High |
| Tax Manipulation | Team can set taxes up to 10% buy / 15% sell | Medium |
| Pause Abuse | Admin can pause auctions trapping user funds | High |
| No Timelock | All admin changes take effect immediately | Medium |
| Team Wallet Access | Multiple addresses can modify protocol settings | Medium |

---

## Recommendations

1. **Implement Pull-Based Rewards**: Replace the unbounded loop with a system where users update only their own rewards
2. **Add Timelock**: Implement a timelock contract for all admin functions with at least 24-48 hour delay
3. **Emergency Withdrawal**: Add mechanism for users to withdraw auction deposits if paused beyond threshold
4. **Multisig Admin**: Replace single admin key with multisig wallet
5. **Slippage Protection**: Add minimum output amounts to all swap and liquidity operations
6. **Event Logging**: Add events for all state-changing admin functions
7. **Zero-Address Validation**: Add checks to prevent setting critical addresses to zero

---

## Conclusion

MoniesTree implements an innovative auction and vesting mechanism, but contains several critical and high-severity issues that should be addressed before production use. The unbounded loop in the staking contract is particularly concerning as it will cause permanent protocol failure at scale. The centralization risks and lack of timelock also present significant trust assumptions for users.

We recommend addressing all Critical and High severity findings before deployment, and implementing the recommended mitigations for Medium severity issues.
