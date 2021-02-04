import { BigInt, BigDecimal } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  Claimed,
  CurrentStrategyUpdated,
  FeeClaimed,
  Migrated,
  MigratorInitialized,
  MigratorUpdated,
  NextStrategyRemoved,
  NextStrategyUpdated,
  OwnerChanged,
  OwnerNominated,
  PoolIncreased,
  PriceUpdated,
  RewardsUnlocked,
  Staked,
  Transfer,
  Unstaked,
  UnstakingTimeUpdated,
  Withdrawed,
} from "../generated/OmStaking/Contract"

import {
  Sync
} from "../generated/EthUsdPair/Pair"

import * as schema from "../generated/schema"

// let priceHelper = () : BigInt => {

//   let EthOm = schema.EthOmSync.load('1')
//   let EthUsd = schema.EthUsdSync.load('1')

//   if (EthOm == null || EthUsd == null) {
//     BigInt.fromI32(0)
//   }

//   let price = 0;

//   return BigInt.fromI32(1)
// }

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let id = event.transaction.hash.toHex()
  let entity = new schema.Approval(id)

  // Entity fields can be set based on event parameters
  entity.value = event.params.value
  entity.owner = event.params.owner

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleOwnerChanged(event: OwnerChanged): void {

}

export function handleClaimed(event: Claimed): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.Claim(id)

  entity.account = event.params.account
  entity.burnedAmount = event.params.burnedAmount
  entity.claimedAmount = event.params.claimedAmount
  entity.feeAmount = event.params.feeAmount
  entity.requestedAmount = event.params.requestedAmount

  entity.save()
}

export function handleCurrentStrategyUpdated(
  event: CurrentStrategyUpdated
): void {
  // let id = event.transaction.hash.toHex()
  // let entity = new schema.StrategyUpdate(id)

  // entity.perBlockReward = event.params.perBlockReward
  // entity.endBlockNumber = event.params.endBlockNumber
  // entity.startBlockNumber = event.params.startBlockNumber

  // entity.save()
}

export function handleFeeClaimed(event: FeeClaimed): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.FeeClaimed(id)

  event.params.amount
}

export function handleMigrated(event: Migrated): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.Migrated(id)

  entity.account = event.params.account
  entity.omTokenV1StakeAmount = event.params.omTokenV1StakeAmount
  entity.stakingPoolV1Reward = event.params.stakingPoolV1Reward
  entity.stakingPoolV2Reward = event.params.stakingPoolV2Reward
}

export function handleNextStrategyRemoved(event: NextStrategyRemoved): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.NextStrategyRemoved(id)
  entity.save()
}

export function handleNextStrategyUpdated(event: NextStrategyUpdated): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.NextStrategyUpdated(id)

  entity.endBlockNumber = event.params.endBlockNumber
  entity.perBlockReward = event.params.perBlockReward
  entity.startBlockNumber = event.params.startBlockNumber

  entity.save()
}

export function handlePoolIncreased(event: PoolIncreased): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.PoolIncreased(id)

  entity.amount = event.params.amount
  entity.payer = event.params.payer

  entity.save()
}

export function handleMigratorUpdated(event: MigratorUpdated): void {}

export function handleMigratorInitialized(event: MigratorInitialized): void {}

export function handlePriceUpdated(event: PriceUpdated): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.PriceUpdated(id)

  entity.base = event.params.base
  entity.exponentiation = event.params.exponentiation
  entity.mantissa = event.params.mantissa

  entity.save()
}

export function handleRewardsUnlocked(event: RewardsUnlocked): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.RewardsUnlocked(id)

  entity.amount = event.params.amount

  entity.save()
}

export function handleStaked(event: Staked): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.Staked(id)

  entity.account = event.params.account
  entity.mintedAmount = event.params.mintedAmount
  entity.payer = event.params.payer
  entity.stakedAmount = event.params.stakedAmount

  entity.save()



  // Get OM Price

  let ethOm = schema.EthOmSync.load("1")
  let ethUsd = schema.EthUsdSync.load("1")
  

  let omPriceInEth = (ethOm.om).div(ethOm.eth);
  let conversionRateHelper9 = BigInt.fromI32(1000000000);
  let conversionRateHelper3 = BigInt.fromI32(1000);
  let conversionRateHelper12 = conversionRateHelper9.times(conversionRateHelper3)
  let conversionRateHelper18 = conversionRateHelper9.times(conversionRateHelper9)
  let ethConverted = ethUsd.eth.div(conversionRateHelper12)
  let ethPrice = (ethUsd.usd.div(ethConverted)).times(conversionRateHelper18);

  let omUsd = ethPrice.div(omPriceInEth)

  // Daily liq Update

  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayStartTimestamp = dayID
  let mantraDaoDayData = schema.MantraDaoDayData.load(dayID.toString())
  if (mantraDaoDayData === null) {
    mantraDaoDayData = new schema.MantraDaoDayData(dayID.toString())
    mantraDaoDayData.date = dayStartTimestamp
    mantraDaoDayData.totalLiquidityUSD = BigInt.fromI32(0);
    mantraDaoDayData.totalLiquidityOM = BigInt.fromI32(0)
    mantraDaoDayData.txCount = BigInt.fromI32(0);
  }
  
  mantraDaoDayData.totalLiquidityOM = mantraDaoDayData.totalLiquidityOM.plus(event.params.stakedAmount)
  mantraDaoDayData.totalLiquidityUSD = mantraDaoDayData.totalLiquidityUSD.plus((event.params.stakedAmount.times(omUsd)).div(conversionRateHelper18))
  mantraDaoDayData.txCount = mantraDaoDayData.txCount.plus(BigInt.fromI32(1))

  mantraDaoDayData.save()
}

export function handleTransfer(event: Transfer): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.Transfer(id)

  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.save()
}

export function handleUnstaked(event: Unstaked): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.Unstaked(id)

  entity.account = event.params.account
  entity.burnedAmount = event.params.burnedAmount
  entity.requestedAmount = event.params.requestedAmount
  entity.unstakedAmount = event.params.unstakedAmount

  entity.save()

  // Get OM Price

  let ethOm = schema.EthOmSync.load("1")
  let ethUsd = schema.EthUsdSync.load("1")
  

  let omPriceInEth = (ethOm.om).div(ethOm.eth);
  let conversionRateHelper9 = BigInt.fromI32(1000000000);
  let conversionRateHelper3 = BigInt.fromI32(1000);
  let conversionRateHelper12 = conversionRateHelper9.times(conversionRateHelper3)
  let conversionRateHelper18 = conversionRateHelper9.times(conversionRateHelper9)
  let ethConverted = ethUsd.eth.div(conversionRateHelper12)
  let ethPrice = (ethUsd.usd.div(ethConverted)).times(conversionRateHelper18);

  let omUsd = ethPrice.div(omPriceInEth)

  // Daily liq update

  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400

  let dayStartTimestamp = dayID
  let mantraDaoDayData = schema.MantraDaoDayData.load(dayID.toString())
  if (mantraDaoDayData === null) {
    mantraDaoDayData = new schema.MantraDaoDayData(dayID.toString())
    mantraDaoDayData.date = dayStartTimestamp
    mantraDaoDayData.totalLiquidityUSD = BigInt.fromI32(0);
    mantraDaoDayData.txCount = BigInt.fromI32(0)
    mantraDaoDayData.totalLiquidityOM = BigInt.fromI32(0)
  }

  mantraDaoDayData.totalLiquidityOM = mantraDaoDayData.totalLiquidityOM.minus(event.params.unstakedAmount)
  mantraDaoDayData.totalLiquidityUSD = mantraDaoDayData.totalLiquidityUSD.minus((event.params.unstakedAmount.times(omUsd)).div(conversionRateHelper18))
  mantraDaoDayData.txCount = mantraDaoDayData.txCount.plus(BigInt.fromI32(1))

  mantraDaoDayData.save()
}

export function handleUnstakingTimeUpdated(event: UnstakingTimeUpdated): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.UnstakingTimeUpdated(id)

  entity.unstakingTime = event.params.unstakingTime
  
  
  entity.save()
}

export function handleWithdrawed(event: Withdrawed): void {
  let id = event.transaction.hash.toHex()
  let entity = new schema.Withdrawed(id)

  entity.account = event.params.account
  entity.amount = event.params.amount

  entity.save()
}

export function handleEthUsdSync(event: Sync): void {
  let id = event.transaction.hash.toHex()

  let entity = schema.EthUsdSync.load('1')
  if (entity == null) {
    entity = new schema.EthUsdSync('1')
  }

  entity.eth = event.params.reserve0
  entity.usd = event.params.reserve1

  entity.save()
}

export function handleEthOmSync(event: Sync): void {
  let id = event.transaction.hash.toHex()

  let entity = schema.EthOmSync.load('1')
  if (entity == null) {
    entity = new schema.EthOmSync('1')
  }

  entity.om = event.params.reserve0
  entity.eth = event.params.reserve1

  entity.save()
}