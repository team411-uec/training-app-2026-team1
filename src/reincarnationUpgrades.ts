// 輪廻転生アップグレード層 (reincarnationUpgrades.ts)
// 徳ではなく「輪廻転生ポイント」で買うアップグレードをまとめる。
// upgrades.ts との決定的な違い: ここの購入状態は輪廻転生でリセットされない
// （reincarnation.ts の reincarnate() から reset 関数を呼ばれることは一切ない）。
// 転生しても効果が残り続けるのが、このポイントの存在意義だから。

import { adjustRatio } from "./omikuji";
import { spendReincarnationPoints } from "./reincarnation";

// このアップグレードの値段（輪廻転生ポイント）。
export const LUCK_UPGRADE_COST = 1;
// 大吉の比率をいくつ増やすか。
const INCREASE_AMOUNT = 5;
// 吉の比率をいくつ減らすか（大吉が増えた分、他を減らしてバランスを取る）。
const DECREASE_AMOUNT = 5;

// 買ったかどうか。今は1回だけ買える方式。
let luckUpgradePurchased = false;

export function isLuckUpgradePurchased(): boolean {
  return luckUpgradePurchased;
}

// ボタンが押されたときに main.ts から呼ばれる。
// 1. 購入済みなら何もしない
// 2. ポイントが足りなければ何もしない
// 3. 両方クリアしたら、大吉を増やして吉を減らし、購入済みにする
export function buyLuckUpgrade(): boolean {
  if (luckUpgradePurchased) {
    return false;
  }

  const success = spendReincarnationPoints(LUCK_UPGRADE_COST);
  if (!success) {
    return false;
  }

  adjustRatio("大吉", INCREASE_AMOUNT);
  adjustRatio("吉", -DECREASE_AMOUNT);
  luckUpgradePurchased = true;
  return true;
}
