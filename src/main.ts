// イベント層 (main.ts)
// 各ボタンのクリックと、データ層（omikuji / clickcount / tokens / upgrades / reincarnation）の
// 関数を結びつける。DOM操作は render.ts の関数を呼ぶだけで、ここでは直接行わない。
//
// 3つのボタンの役割:
//   おみくじを引く   → 10回クリックで1回引く。結果に応じて徳がもらえる。
//   輪廻転生する     → おみくじ箱を引き切ったときだけ押せる。押すと全状態がリセットされる代わりに
//                       輪廻転生ポイント（消えない資産）がもらえる。
//   アップグレード   → 徳を消費して、必要クリック回数を減らす（1回だけ購入可）。

import { resetOmikuji, drawOmikuji } from "./omikuji";
import { handleClickForDraw, DEFAULT_REQUIRED_CLICKS } from "./clickcount";
import { addTokensForResult, getTokenCount } from "./tokens";
import {
  renderClickProgress,
  renderResult,
  renderTokens,
  renderUpgradeButton,
  renderReincarnateButton,
  renderReincarnationPoints,
  renderLuckUpgradeButton,
} from "./render";
import {
  buyClickUpgrade,
  CLICK_UPGRADE_COST,
  isClickUpgradePurchased,
} from "./upgrades";
import {
  canReincarnate,
  getReincarnationPoints,
  reincarnate,
} from "./reincarnation";
import {
  buyLuckUpgrade,
  isLuckUpgradePurchased,
  LUCK_UPGRADE_COST,
} from "./reincarnationUpgrades";

function main(): void {
  // おみくじ箱を用意する（1回呼ぶと、くじが入った状態になる）。
  resetOmikuji();
  renderReincarnateButton(canReincarnate());
  renderReincarnationPoints(getReincarnationPoints());

  renderUpgradeButton(CLICK_UPGRADE_COST, isClickUpgradePurchased());

  renderLuckUpgradeButton(LUCK_UPGRADE_COST, isLuckUpgradePurchased());

  const drawButton = document.getElementById("draw-button");

  drawButton?.addEventListener("click", () => {
    // 押すたびに進捗を更新。まだ10回に達していなければ canDraw は false で、ここで終わる。
    const { count, requiredClicks, canDraw } = handleClickForDraw();
    renderClickProgress(count, requiredClicks);

    if (canDraw) {
      const result = drawOmikuji();
      renderResult(result);
      // この draw で箱が空になった可能性があるので、毎回ボタンの状態を更新する。
      renderReincarnateButton(canReincarnate());

      // 箱が既に空で drawOmikuji が null を返したときは徳を計算しない。
      if (result !== null) {
        const tokenTotal = addTokensForResult(result);
        renderTokens(tokenTotal);
      }
    }
  });

  const reincarnateButton = document.getElementById("reincarnate-button");
  reincarnateButton?.addEventListener("click", () => {
    // reincarnate() は箱が空でなければ何もせず false を返す（disabled のはずだが念のため）。
    const success = reincarnate();

    if (success) {
      // 転生でリセットされた状態に合わせて、画面全体を初期表示へ戻す。
      renderResult(null);
      renderClickProgress(0, DEFAULT_REQUIRED_CLICKS);
      renderTokens(getTokenCount());
      renderUpgradeButton(CLICK_UPGRADE_COST, isClickUpgradePurchased());
      renderReincarnationPoints(getReincarnationPoints());
      renderReincarnateButton(canReincarnate());
    }
  });

  const upgradeButton = document.getElementById("upgrade-button");
  upgradeButton?.addEventListener("click", () => {
    // buyClickUpgrade() は購入済み、または徳が足りなければ何もせず false を返す。
    const success = buyClickUpgrade();

    if (success) {
      renderTokens(getTokenCount());
      renderUpgradeButton(CLICK_UPGRADE_COST, isClickUpgradePurchased());
    }
  });

  const luckUpgradeButton = document.getElementById("luck-upgrade-button");
  luckUpgradeButton?.addEventListener("click", () => {
    const success = buyLuckUpgrade();

    if (success) {
      renderReincarnationPoints(getReincarnationPoints());
      renderLuckUpgradeButton(LUCK_UPGRADE_COST, isLuckUpgradePurchased());
    }
  });
}

main();
