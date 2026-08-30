// 徳ポイント層 (tokens.ts)
// おみくじの結果に応じてもらえる「徳」ポイントの所持数と、増減の関数を持つ。
// アップグレードの購入に使う通貨としての役割を持つ（輪廻転生ポイントとは別物）。

import type { OmikujiResult } from "./omikuji";

// 結果ごとにもらえる徳の量。omikuji.ts の omikujiRatios と同じ考え方で、
// 箱の中で少ない（レアな）結果ほど多くの徳がもらえるようにしている。
const tokenValues: Record<OmikujiResult, number> = {
  大吉: 100,
  中吉: 30,
  小吉: 20,
  吉: 10,
  末吉: 5,
  凶: 0,
};

// 現在の徳の所持数。export せず、下の関数を通してのみ操作する。
let tokenCount = 0;

// おみくじを引いたときに main.ts から呼ばれる。結果に応じた徳を加算し、加算後の合計を返す。
export function addTokensForResult(result: OmikujiResult): number {
  tokenCount += tokenValues[result];
  return tokenCount;
}

// 今の徳の所持数を読み取るためだけの関数（値を変えない）。
export function getTokenCount(): number {
  return tokenCount;
}

// アップグレード購入時に upgrades.ts から呼ばれる。
// 所持数が足りなければ何もせず false、足りていれば引いて true を返す。
export function spendTokens(amount: number): boolean {
  if (tokenCount < amount) {
    return false;
  }

  tokenCount -= amount;
  return true;
}

// 輪廻転生したときに reincarnation.ts から呼ばれる。徳を0に戻す。
export function resetTokens(): void {
  tokenCount = 0;
}
