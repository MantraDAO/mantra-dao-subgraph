import { BigInt } from "@graphprotocol/graph-ts"
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
  Withdrawed
} from "../generated/Contract/Contract"
import * as schema from "../generated/schema"



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
}
