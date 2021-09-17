import { createAction } from "redux-actions";

const updatePricesSuccess = createAction('UPDATE_PRICES_SUCCESS');
export const fetchPrices = () => async (dispatch) => {
  try {
    // const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=nafter&vs_currencies=usd');
    // const naftData = (await response.json());

    // const busdResp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=busd&vs_currencies=usd');
    // const busdData = await busdResp.json();
    // dispatch(updatePricesSuccess({
    //   naf: naftData['nafter']['usd'],
    //   naft: naftData['nafter']['usd'],
    //   busd: busdData['busd']['usd']
    // }));
    dispatch(updatePricesSuccess({
      jet: 10,
      jet: 10,
      busd: 1
    }));
  } catch (e) {
    console.error(e);
  }
};
