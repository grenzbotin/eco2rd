import { SCOPE_MONTH, SCOPE_TODAY, SCOPE_TOTAL } from "config/constants";

const getBoD = (time: Date): number => time.setHours(0, 0, 0, 0);

const checkForDay = (timestamp: Date, scope: string): boolean | undefined => {
  const today = getBoD(new Date());
  const thisMonth = new Date(today).setDate(1);
  const thatDay = getBoD(new Date(timestamp));
  const thatMonth = new Date(thatDay).setDate(1);

  return {
    [SCOPE_TODAY]: today === thatDay,
    [SCOPE_MONTH]: thisMonth === thatMonth,
    [SCOPE_TOTAL]: true
  }[scope];
};

export { getBoD, checkForDay };
