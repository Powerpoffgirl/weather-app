import { createStore } from "redux";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const initialState = {
  temperatureVaLueCelcius: 0,
  temperatureVaLueFarhenheit: 0,
};

export const store = createStore(reducer, initialState, composeWithDevTools());
