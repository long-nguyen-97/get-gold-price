export type GoldPrice = {
  sell: number;
  buy: number;
};

export const GetGoldPriceAsync = async (): Promise<GoldPrice> => {
    //TODO: Add real request to API
//   const response = await fetch(FetchUrl("Info"), {
//     method: "GET",
//     headers: GetAuthHeader()
//   });

//   const jsonData = (await (await HandleResponse(response)).json());
  return {
    sell: 6690,
    buy: 6600    
  } as GoldPrice;
};
