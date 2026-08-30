// 描画層 (render.ts)
// 状態を受け取って画面(DOM)に表示するだけを担当する。
// おみくじを引くロジックは omikuji.ts、ボタンと処理の連携は main.ts が持つ。

import type { OmikujiResult } from "./omikuji";

// ステップ1（最初の課題）: この関数を実装する。
//
// いまは「引く」ボタンを押すと開発者ツール(F12)の Console に
// 「引いた結果: 大吉」と出るが、画面の文字は変わらない。
// この関数の中身が空だからで、ここに DOM 操作を書けば画面に反映される。
//
// ヒント:
//  - 表示先は index.html の id="result" の要素。document.getElementById で取れる。
//  - 要素の中の文字は textContent で書き換えられる。
//  - result が null のとき（リセット直後など）は初期メッセージを出す。
export function renderResult(result: OmikujiResult | null): void {
  // ステップ0 ではコンソールに結果が出るだけ。
  console.log("引いた結果:", result);

  // TODO（ステップ1）: ここに DOM 操作を書いて、画面に結果を表示する。
  const resultElement = document.getElementById("result");
  if (resultElement) {
    resultElement.textContent = result === null ? "ここに結果が出ます" : result;
  }
}

// 拡張ポイント（ステップ2以降）。必要になったら関数を足す。
//  - 履歴をリスト表示する: document.createElement で <li> を作り、<ul id="history"> に足す関数。
//  - 残りくじ枚数を表示する: omikuji.ts に残数を返す関数を足したうえで表示用の関数を足す。

// クリック進捗（例: "3/10"）を表示する。clickcount.ts の handleClickForDraw の戻り値を
// そのまま count / requiredClicks として受け取る想定。
export function renderClickProgress(
  count: number,
  requiredClicks: number,
): void {
  const progressElement = document.getElementById("click-progress");
  if (progressElement) {
    progressElement.textContent = `${count}/${requiredClicks}`;
  }
}

// 徳の所持数を表示する。
export function renderTokens(tokenCount: number): void {
  const tokensElement = document.getElementById("tokens");
  if (tokensElement) {
    tokensElement.textContent = `徳: ${tokenCount}`;
  }
}

// アップグレードボタンの文言と押せる/押せない状態を更新する。
// .disabled を扱うため HTMLButtonElement として型キャストしている。
// 徳アップグレード1: 必要クリック回数を1減らすボタン。
export function renderUpgradeButton1(cost: number, purchased: boolean): void {
  const button = document.getElementById(
    "upgrade-button-1",
  ) as HTMLButtonElement | null;

  if (button) {
    button.textContent = purchased
      ? "購入済み"
      : `必要クリック回数を1減らす(${cost} 徳)`;
    button.disabled = purchased;
  }
}

// 徳アップグレード2: 必要クリック回数を1減らすボタン。
export function renderUpgradeButton2(cost: number, purchased: boolean): void {
  const button = document.getElementById(
    "upgrade-button-2",
  ) as HTMLButtonElement | null;

  if (button) {
    button.textContent = purchased
      ? "購入済み"
      : `必要クリック回数を1減らす(${cost} 徳)`;
    button.disabled = purchased;
  }
}

// 徳アップグレード3: 必要クリック回数を1減らすボタン。
export function renderUpgradeButton3(cost: number, purchased: boolean): void {
  const button = document.getElementById(
    "upgrade-button-3",
  ) as HTMLButtonElement | null;

  if (button) {
    button.textContent = purchased
      ? "購入済み"
      : `必要クリック回数を1減らす(${cost} 徳)`;
    button.disabled = purchased;
  }
}

// 徳アップグレード4: 必要クリック回数を1減らすボタン。
export function renderUpgradeButton4(cost: number, purchased: boolean): void {
  const button = document.getElementById(
    "upgrade-button-4",
  ) as HTMLButtonElement | null;

  if (button) {
    button.textContent = purchased
      ? "購入済み"
      : `必要クリック回数を1減らす(${cost} 徳)`;
    button.disabled = purchased;
  }
}

// 輪廻転生ボタンの押せる/押せない状態だけを更新する（文言は index.html の固定文言のまま）。
// おみくじ箱を引き切っているとき（canReincarnate が true）だけ押せる。
export function renderReincarnateButton(canReincarnate: boolean): void {
  const reincarnatebutton = document.getElementById(
    "reincarnate-button",
  ) as HTMLButtonElement | null;

  if (reincarnatebutton) {
    reincarnatebutton.disabled = !canReincarnate;
  }
}

// 輪廻転生ポイントの所持数を表示する。
export function renderReincarnationPoints(points: number): void {
  const pointsElement = document.getElementById("reincarnation-points");
  if (pointsElement) {
    pointsElement.textContent = `輪廻転生ポイント: ${points}`;
  }
}

// 輪廻転生アップグレード1: 末吉を大吉に変えるボタン。
export function renderLuckUpgradeButton1(
  cost: number,
  purchased: boolean,
): void {
  const button = document.getElementById(
    "luck-upgrade-button-1",
  ) as HTMLButtonElement | null;

  if (button) {
    button.textContent = purchased
      ? "購入済み"
      : `末吉を大吉に変える（${cost} 輪廻転生ポイント）`;
    button.disabled = purchased;
  }
}

// 輪廻転生アップグレード2: 吉を大吉に変えるボタン。
export function renderLuckUpgradeButton2(
  cost: number,
  purchased: boolean,
): void {
  const button = document.getElementById(
    "luck-upgrade-button-2",
  ) as HTMLButtonElement | null;

  if (button) {
    button.textContent = purchased
      ? "購入済み"
      : `吉を大吉に変える（${cost} 輪廻転生ポイント）`;
    button.disabled = purchased;
  }
}

// 輪廻転生アップグレード3: 小吉を大吉に変えるボタン。
export function renderLuckUpgradeButton3(
  cost: number,
  purchased: boolean,
): void {
  const button = document.getElementById(
    "luck-upgrade-button-3",
  ) as HTMLButtonElement | null;

  if (button) {
    button.textContent = purchased
      ? "購入済み"
      : `小吉を大吉に変える（${cost} 輪廻転生ポイント）`;
    button.disabled = purchased;
  }
}

// 輪廻転生アップグレード4: 中吉を大吉に変えるボタン。
export function renderLuckUpgradeButton4(
  cost: number,
  purchased: boolean,
): void {
  const button = document.getElementById(
    "luck-upgrade-button-4",
  ) as HTMLButtonElement | null;

  if (button) {
    button.textContent = purchased
      ? "購入済み"
      : `中吉を大吉に変える（${cost} 輪廻転生ポイント）`;
    button.disabled = purchased;
  }
}

// 輪廻転生アップグレード5: 凶を大吉に変えるボタン。
export function renderLuckUpgradeButton5(
  cost: number,
  purchased: boolean,
): void {
  const button = document.getElementById(
    "luck-upgrade-button-5",
  ) as HTMLButtonElement | null;

  if (button) {
    button.textContent = purchased
      ? "購入済み"
      : `凶を大吉に変える（${cost} 輪廻転生ポイント）`;
    button.disabled = purchased;
  }
}

// 残り枚数と、結果ごとの内訳をまとめて表示する。
export function renderRemaining(
  count: number,
  counts: Record<OmikujiResult, number>,
): void {
  const remainingElement = document.getElementById("remaining");
  if (remainingElement) {
    // 「大吉:4 中吉:14 ...」のような内訳文字列を、1種類ずつ追記して組み立てる。
    let breakdownText = "";
    for (const [result, resultCount] of Object.entries(counts)) {
      breakdownText += `${result}:${resultCount} `;
    }

    remainingElement.textContent = `残り ${count} 枚 (${breakdownText.trim()})`;
  }
}
