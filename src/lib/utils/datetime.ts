export const dateToStr = (
  origin: Date,
  options?: {
    dateSplitter?: string;
    withTime?: boolean;
    timeSplitter?: string;
  },
) => {
  const dateSplitter = options?.dateSplitter ?? '-';
  const timeSplitter = options?.timeSplitter ?? ':';
  const withTime = options?.withTime ?? false;

  const y = origin.getFullYear();
  const M = origin.getMonth() + 1 + '';
  const d = origin.getDate() + '';

  const date = `${y}${dateSplitter}${M.padStart(
    2,
    '0',
  )}${dateSplitter}${d.padStart(2, '0')}`;

  if (!withTime) return date;

  const h = origin.getHours() + '';
  const m = origin.getMinutes() + '';
  const s = origin.getSeconds() + '';

  return (
    date +
    ' ' +
    `${h.padStart(2, '0')}${timeSplitter}${m.padStart(
      2,
      '0',
    )}${timeSplitter}${s.padStart(2, '0')}`
  );
};
