/** 원본배열에서 랜덤으로 n개 요소를 골라낸 새로운 배열 반환 */
export const extractRandomN = <T = any>(origin: T[], n: number) => {
  if (n <= 0) return [];

  const selectedIdxs: number[] = [];

  while (selectedIdxs.length < n) {
    const randomIdx = Math.floor(Math.random() * origin.length);

    const already = selectedIdxs.find((idx) => idx === randomIdx);
    if (already) continue;

    selectedIdxs.push(randomIdx);
  }

  return selectedIdxs.map((idx) => origin[idx]);
};
