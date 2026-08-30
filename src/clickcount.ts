// クリック進捗層 (clickcount.ts)
// 「おみくじを引くボタンを何回押したら、実際に1回引けるか」を管理する状態と関数を持つ。
// おみくじの中身（何が出るか）は omikuji.ts の責任なので、ここでは触らない。

// 何回押したら引けるかの初期値。輪廻転生でこの値に戻すため、名前付きの定数にしている。
export const DEFAULT_REQUIRED_CLICKS = 5;

// 「あと何回で引けるか」の基準値。upgrades.ts の decreaseRequiredClicks でのみ変更される。
let requiredClicks = DEFAULT_REQUIRED_CLICKS;
// 「今何回押したか」。omikuji.ts の tickets と同じく export せず、下の関数を通してのみ操作する。
let clickCount = 0;

// ボタンが押されるたびに main.ts から呼ばれる。
// 戻り値: 今の回数(count)・基準値(requiredClicks)・引けるようになったか(canDraw) をまとめて返す。
// 基準値に達していたら、次の周回に向けて回数を 0 に戻す。
export function handleClickForDraw(): {
  count: number;
  requiredClicks: number;
  canDraw: boolean;
} {
  clickCount += 1;

  if (clickCount >= requiredClicks) {
    clickCount = 0;
    return { count: requiredClicks, requiredClicks, canDraw: true };
  }

  return { count: clickCount, requiredClicks, canDraw: false };
}

// アップグレード購入時に upgrades.ts から呼ばれる。基準値を amount だけ減らす。
// Math.max(1, ...) で「最低でも1回」を保証し、0以下になって壊れないようにしている。
export function decreaseRequiredClicks(amount: number): void {
  requiredClicks = Math.max(1, requiredClicks - amount);
}

// 輪廻転生したときに reincarnation.ts から呼ばれる。
// 基準値・今の回数の両方を初期状態に戻す（アップグレードで下がった基準値も元に戻る）。
export function resetClickState(): void {
  requiredClicks = DEFAULT_REQUIRED_CLICKS;
  clickCount = 0;
}
