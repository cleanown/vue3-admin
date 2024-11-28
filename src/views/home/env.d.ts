type HomeSearch = {
  activeDate: string[] | null;
  activeDimension: number | null;
  revenueDate: string[] | null;
  revenueDimension: number | null;
};
type TotalInfo = {
  type1: number;
  type2: number;
  type3: number;
  type4: number;
  type5: number;
  type6: number;
}
type ActiveInfo = {
  date?: string;
  register: number;
  dau: number;
  uv: number;
  pv: number;
  pwa: number;
};

type RevenueInfo = {
  date?: string;
  recharge: number;
  withdrawal: number;
  profit: number;
  delivery: number;
  other: number;
  balance: number;
};
type PwaInfo = {
  name: string,
  num: number,
}
type RechargeInfo = {
  name: string;
  num: number;
};
type PageChartInfo = {
  name: string;
  num: number;
};