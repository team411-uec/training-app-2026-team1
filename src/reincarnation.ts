// 輪廻転生層 (reincarnation.ts)
// おみくじ箱を引き切ったときの「転生」処理をまとめる司令塔。
// omikuji.ts / clickcount.ts / tokens.ts / upgrades.ts それぞれが公開している
// reset◯◯ 系の関数をここから呼び出し、通常のプレイ状態を初期化する。
// 一方で reincarnationPoint はどの reset◯◯ からも触られないので、
// 転生してもずっと積み上がっていく「消えない資産」になる。

import { isOmikujiBoxEmpty, resetOmikuji } from "./omikuji";
import { resetClickState } from "./clickcount";
import { resetTokens } from "./tokens";
import { resetUpgrades } from "./upgrades";

// 1回の転生でもらえるポイント（固定）。
const POINT_PER_REINCARNATION = 1;

// 輪廻転生ポイントの所持数。export せず、下の関数を通してのみ読み書きする。
let reincarnationPoint = 0;

// おみくじ箱が空（=引き切った）かどうかで、転生できるかを判定する。
export function canReincarnate(): boolean {
  return isOmikujiBoxEmpty();
}

export function getReincarnationPoints(): number {
  return reincarnationPoint;
}

// 転生ボタンが押されたときに main.ts から呼ばれる。
// 転生できる状態でなければ何もせず false を返す。
// できる場合は、ポイントを加算したあと、各データ層のリセット関数をまとめて呼ぶ。
export function reincarnate(): boolean {
  if (!canReincarnate()) {
    return false;
  }

  reincarnationPoint += POINT_PER_REINCARNATION;

  resetOmikuji();
  resetClickState();
  resetTokens();
  resetUpgrades();

  return true;
}

// 輪廻転生ポイントを消費する。tokens.ts の spendTokens と同じパターン。
// 足りなければ何もせず false、足りていれば引いて true を返す。
export function spendReincarnationPoints(amount: number): boolean {
  if (reincarnationPoint < amount) {
    return false;
  }

  reincarnationPoint -= amount;
  return true;
}
