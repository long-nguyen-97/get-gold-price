import axios from "axios";

export type GoldPrice = {
  sell: number;
  buy: number;
};

const url = "/api/prices/";

export const GetGoldPriceAsync = async (id: number): Promise<GoldPrice> => {
  const response = await axios.get(url + id);
  return response.data as GoldPrice;
};
