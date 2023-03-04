import { CELCIUS, FAHRENHEIT } from "./action";

function reducer(state, action) {
  console.log({ action, state });
  switch (action.type) {
    case CELCIUS:
      return {
        ...state,
        celciusValue: action.celciusValue,
      };
    case FAHRENHEIT:
      return {
        ...state,
        farhenheitValue: action.farhenheitValue,
      };
    default:
      return state;
  }
}

export default reducer;
