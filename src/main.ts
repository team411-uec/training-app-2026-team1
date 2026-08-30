// イベント層 (main.ts)
// 各ボタンのクリックと、データ層（omikuji / clickcount / tokens / upgrades / reincarnation）の
// 関数を結びつける。DOM操作は render.ts の関数を呼ぶだけで、ここでは直接行わない。
//
// 3つのボタンの役割:
//   おみくじを引く   → 10回クリックで1回引く。結果に応じて徳がもらえる。
//   輪廻転生する     → おみくじ箱を引き切ったときだけ押せる。押すと全状態がリセットされる代わりに
//                       輪廻転生ポイント（消えない資産）がもらえる。
//   アップグレード   → 徳を消費して、必要クリック回数を減らす（1回だけ購入可）。

import {
  resetOmikuji,
  drawOmikuji,
  getRemainingCount,
  getRemainingCounts,
} from "./omikuji";
import { handleClickForDraw, DEFAULT_REQUIRED_CLICKS } from "./clickcount";
import { addTokensForResult, getTokenCount } from "./tokens";
import {
  renderClickProgress,
  renderResult,
  renderHistory,
  renderTokens,
  renderUpgradeButton1,
  renderUpgradeButton2,
  renderUpgradeButton3,
  renderUpgradeButton4,
  renderReincarnateButton,
  renderReincarnationPoints,
  renderLuckUpgradeButton1,
  renderLuckUpgradeButton2,
  renderLuckUpgradeButton3,
  renderLuckUpgradeButton4,
  renderLuckUpgradeButton5,
  renderRemaining,
} from "./render";
import {
  buyClickUpgrade1,
  buyClickUpgrade2,
  buyClickUpgrade3,
  buyClickUpgrade4,
  isClickUpgrade1Purchased,
  isClickUpgrade2Purchased,
  isClickUpgrade3Purchased,
  isClickUpgrade4Purchased,
  CLICK_UPGRADE_COST_1,
  CLICK_UPGRADE_COST_2,
  CLICK_UPGRADE_COST_3,
  CLICK_UPGRADE_COST_4,
} from "./upgrades";
import {
  canReincarnate,
  getReincarnationPoints,
  reincarnate,
} from "./reincarnation";
import {
  buyLuckUpgrade1,
  buyLuckUpgrade2,
  buyLuckUpgrade3,
  buyLuckUpgrade4,
  buyLuckUpgrade5,
  isLuckUpgrade1Purchased,
  isLuckUpgrade2Purchased,
  isLuckUpgrade3Purchased,
  isLuckUpgrade4Purchased,
  isLuckUpgrade5Purchased,
  LUCK_UPGRADE_COST,
} from "./reincarnationUpgrades";

function main(): void {
  // おみくじ箱を用意する（1回呼ぶと、くじが入った状態になる）。
  resetOmikuji();
  const history: string[] = [];
  renderReincarnateButton(canReincarnate());
  renderReincarnationPoints(getReincarnationPoints());

  renderUpgradeButton1(CLICK_UPGRADE_COST_1, isClickUpgrade1Purchased());
  renderUpgradeButton2(CLICK_UPGRADE_COST_2, isClickUpgrade2Purchased());
  renderUpgradeButton3(CLICK_UPGRADE_COST_3, isClickUpgrade3Purchased());
  renderUpgradeButton4(CLICK_UPGRADE_COST_4, isClickUpgrade4Purchased());

  renderRemaining(getRemainingCount(), getRemainingCounts());

  renderLuckUpgradeButton1(LUCK_UPGRADE_COST, isLuckUpgrade1Purchased());
  renderLuckUpgradeButton2(LUCK_UPGRADE_COST, isLuckUpgrade2Purchased());
  renderLuckUpgradeButton3(LUCK_UPGRADE_COST, isLuckUpgrade3Purchased());
  renderLuckUpgradeButton4(LUCK_UPGRADE_COST, isLuckUpgrade4Purchased());
  renderLuckUpgradeButton5(LUCK_UPGRADE_COST, isLuckUpgrade5Purchased());

  const drawButton = document.getElementById("draw-button");

  drawButton?.addEventListener("click", () => {
    // 押すたびに進捗を更新。まだ10回に達していなければ canDraw は false で、ここで終わる。
    const { count, requiredClicks, canDraw } = handleClickForDraw();
    renderClickProgress(count, requiredClicks);

    if (canDraw) {
      const result = drawOmikuji();
      renderResult(result);

      if (result) {
        history.push(result);
        renderHistory(result);
      }

      renderRemaining(getRemainingCount(), getRemainingCounts());
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
      renderUpgradeButton1(CLICK_UPGRADE_COST_1, isClickUpgrade1Purchased());
      renderUpgradeButton2(CLICK_UPGRADE_COST_2, isClickUpgrade2Purchased());
      renderUpgradeButton3(CLICK_UPGRADE_COST_3, isClickUpgrade3Purchased());
      renderUpgradeButton4(CLICK_UPGRADE_COST_4, isClickUpgrade4Purchased());
      renderReincarnationPoints(getReincarnationPoints());
      renderReincarnateButton(canReincarnate());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });

  const upgradeButton1 = document.getElementById("upgrade-button-1");
  upgradeButton1?.addEventListener("click", () => {
    const success = buyClickUpgrade1();

    if (success) {
      renderTokens(getTokenCount());
      renderUpgradeButton1(CLICK_UPGRADE_COST_1, isClickUpgrade1Purchased());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });

  const upgradeButton2 = document.getElementById("upgrade-button-2");
  upgradeButton2?.addEventListener("click", () => {
    const success = buyClickUpgrade2();

    if (success) {
      renderTokens(getTokenCount());
      renderUpgradeButton2(CLICK_UPGRADE_COST_2, isClickUpgrade2Purchased());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });

  const upgradeButton3 = document.getElementById("upgrade-button-3");
  upgradeButton3?.addEventListener("click", () => {
    const success = buyClickUpgrade3();

    if (success) {
      renderTokens(getTokenCount());
      renderUpgradeButton3(CLICK_UPGRADE_COST_3, isClickUpgrade3Purchased());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });

  const upgradeButton4 = document.getElementById("upgrade-button-4");
  upgradeButton4?.addEventListener("click", () => {
    const success = buyClickUpgrade4();

    if (success) {
      renderTokens(getTokenCount());
      renderUpgradeButton4(CLICK_UPGRADE_COST_4, isClickUpgrade4Purchased());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });

  const luckUpgradeButton1 = document.getElementById("luck-upgrade-button-1");
  luckUpgradeButton1?.addEventListener("click", () => {
    const success = buyLuckUpgrade1();

    if (success) {
      renderReincarnationPoints(getReincarnationPoints());
      renderLuckUpgradeButton1(LUCK_UPGRADE_COST, isLuckUpgrade1Purchased());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });

  const luckUpgradeButton2 = document.getElementById("luck-upgrade-button-2");
  luckUpgradeButton2?.addEventListener("click", () => {
    const success = buyLuckUpgrade2();

    if (success) {
      renderReincarnationPoints(getReincarnationPoints());
      renderLuckUpgradeButton2(LUCK_UPGRADE_COST, isLuckUpgrade2Purchased());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });

  const luckUpgradeButton3 = document.getElementById("luck-upgrade-button-3");
  luckUpgradeButton3?.addEventListener("click", () => {
    const success = buyLuckUpgrade3();

    if (success) {
      renderReincarnationPoints(getReincarnationPoints());
      renderLuckUpgradeButton3(LUCK_UPGRADE_COST, isLuckUpgrade3Purchased());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });

  const luckUpgradeButton4 = document.getElementById("luck-upgrade-button-4");
  luckUpgradeButton4?.addEventListener("click", () => {
    const success = buyLuckUpgrade4();

    if (success) {
      renderReincarnationPoints(getReincarnationPoints());
      renderLuckUpgradeButton4(LUCK_UPGRADE_COST, isLuckUpgrade4Purchased());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });

  const luckUpgradeButton5 = document.getElementById("luck-upgrade-button-5");
  luckUpgradeButton5?.addEventListener("click", () => {
    const success = buyLuckUpgrade5();

    if (success) {
      renderReincarnationPoints(getReincarnationPoints());
      renderLuckUpgradeButton5(LUCK_UPGRADE_COST, isLuckUpgrade5Purchased());
      renderRemaining(getRemainingCount(), getRemainingCounts());
    }
  });
}

main();
