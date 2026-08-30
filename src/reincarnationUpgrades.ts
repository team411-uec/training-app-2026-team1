// 輪廻転生アップグレード層 (reincarnationUpgrades.ts)
// 輪廻転生ポイントで買うアップグレードをまとめる。5種類あり、それぞれ1回だけ買える。
// 買うと、対象の結果の残り枚数をまるごと大吉に移す（対象を0にし、その分だけ大吉を増やす）。
// upgrades.ts との違い: ここの購入状態は輪廻転生でリセットされない
// （reincarnation.ts の reincarnate() から reset 関数を呼ばれることは一切ない）。

import { adjustRatio, omikujiRatios } from "./omikuji";
import { spendReincarnationPoints } from "./reincarnation";

export const LUCK_UPGRADE_COST = 1;

// --- 1: 末吉 を 大吉 に変える ---
let luckUpgrade1Purchased = false;

export function isLuckUpgrade1Purchased(): boolean {
  return luckUpgrade1Purchased;
}

export function buyLuckUpgrade1(): boolean {
  if (luckUpgrade1Purchased) {
    return false;
  }

  const success = spendReincarnationPoints(LUCK_UPGRADE_COST);
  if (!success) {
    return false;
  }

  const amount = omikujiRatios["末吉"];
  adjustRatio("大吉", amount);
  adjustRatio("末吉", -amount);
  luckUpgrade1Purchased = true;
  return true;
}

// --- 2: 吉 を 大吉 に変える ---
let luckUpgrade2Purchased = false;

export function isLuckUpgrade2Purchased(): boolean {
  return luckUpgrade2Purchased;
}

export function buyLuckUpgrade2(): boolean {
  if (luckUpgrade2Purchased) {
    return false;
  }

  const success = spendReincarnationPoints(LUCK_UPGRADE_COST);
  if (!success) {
    return false;
  }

  const amount = omikujiRatios["吉"];
  adjustRatio("大吉", amount);
  adjustRatio("吉", -amount);
  luckUpgrade2Purchased = true;
  return true;
}

// --- 3: 小吉 を 大吉 に変える ---
let luckUpgrade3Purchased = false;

export function isLuckUpgrade3Purchased(): boolean {
  return luckUpgrade3Purchased;
}

export function buyLuckUpgrade3(): boolean {
  if (luckUpgrade3Purchased) {
    return false;
  }

  const success = spendReincarnationPoints(LUCK_UPGRADE_COST);
  if (!success) {
    return false;
  }

  const amount = omikujiRatios["小吉"];
  adjustRatio("大吉", amount);
  adjustRatio("小吉", -amount);
  luckUpgrade3Purchased = true;
  return true;
}

// --- 4: 中吉 を 大吉 に変える ---
let luckUpgrade4Purchased = false;

export function isLuckUpgrade4Purchased(): boolean {
  return luckUpgrade4Purchased;
}

export function buyLuckUpgrade4(): boolean {
  if (luckUpgrade4Purchased) {
    return false;
  }

  const success = spendReincarnationPoints(LUCK_UPGRADE_COST);
  if (!success) {
    return false;
  }

  const amount = omikujiRatios["中吉"];
  adjustRatio("大吉", amount);
  adjustRatio("中吉", -amount);
  luckUpgrade4Purchased = true;
  return true;
}

// --- 5: 凶 を 大吉 に変える ---
let luckUpgrade5Purchased = false;

export function isLuckUpgrade5Purchased(): boolean {
  return luckUpgrade5Purchased;
}

export function buyLuckUpgrade5(): boolean {
  if (luckUpgrade5Purchased) {
    return false;
  }

  const success = spendReincarnationPoints(LUCK_UPGRADE_COST);
  if (!success) {
    return false;
  }

  const amount = omikujiRatios["凶"];
  adjustRatio("大吉", amount);
  adjustRatio("凶", -amount);
  luckUpgrade5Purchased = true;
  return true;
}
