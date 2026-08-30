// アップグレード層 (upgrades.ts)
// 徳を消費して、clickcount.ts の必要クリック回数を減らすアップグレードをまとめる。
// 4種類あり、それぞれ1回だけ買える。輪廻転生すると全部リセットされ、また買える状態に戻る。

import { decreaseRequiredClicks } from "./clickcount";
import { spendTokens } from "./tokens";

const CLICK_REDUCTION = 1;

// --- 1 ---
export const CLICK_UPGRADE_COST_1 = 100;
let clickUpgrade1Purchased = false;

export function isClickUpgrade1Purchased(): boolean {
  return clickUpgrade1Purchased;
}

export function buyClickUpgrade1(): boolean {
  if (clickUpgrade1Purchased) {
    return false;
  }

  const success = spendTokens(CLICK_UPGRADE_COST_1);
  if (!success) {
    return false;
  }

  decreaseRequiredClicks(CLICK_REDUCTION);
  clickUpgrade1Purchased = true;
  return true;
}

// --- 2 ---
export const CLICK_UPGRADE_COST_2 = 200;
let clickUpgrade2Purchased = false;

export function isClickUpgrade2Purchased(): boolean {
  return clickUpgrade2Purchased;
}

export function buyClickUpgrade2(): boolean {
  if (clickUpgrade2Purchased) {
    return false;
  }

  const success = spendTokens(CLICK_UPGRADE_COST_2);
  if (!success) {
    return false;
  }

  decreaseRequiredClicks(CLICK_REDUCTION);
  clickUpgrade2Purchased = true;
  return true;
}

// --- 3 ---
export const CLICK_UPGRADE_COST_3 = 400;
let clickUpgrade3Purchased = false;

export function isClickUpgrade3Purchased(): boolean {
  return clickUpgrade3Purchased;
}

export function buyClickUpgrade3(): boolean {
  if (clickUpgrade3Purchased) {
    return false;
  }

  const success = spendTokens(CLICK_UPGRADE_COST_3);
  if (!success) {
    return false;
  }

  decreaseRequiredClicks(CLICK_REDUCTION);
  clickUpgrade3Purchased = true;
  return true;
}

// --- 4 ---
export const CLICK_UPGRADE_COST_4 = 800;
let clickUpgrade4Purchased = false;

export function isClickUpgrade4Purchased(): boolean {
  return clickUpgrade4Purchased;
}

export function buyClickUpgrade4(): boolean {
  if (clickUpgrade4Purchased) {
    return false;
  }

  const success = spendTokens(CLICK_UPGRADE_COST_4);
  if (!success) {
    return false;
  }

  decreaseRequiredClicks(CLICK_REDUCTION);
  clickUpgrade4Purchased = true;
  return true;
}

// 輪廻転生したときに reincarnation.ts から呼ばれる。4つとも購入済みフラグを取り消す。
export function resetUpgrades(): void {
  clickUpgrade1Purchased = false;
  clickUpgrade2Purchased = false;
  clickUpgrade3Purchased = false;
  clickUpgrade4Purchased = false;
}
