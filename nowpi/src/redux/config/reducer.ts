import { ConfigActions, UPDATE_NETWORK_ACTION, SELECT_NETWORK_ACTION } from "./action";

export interface Wifi {
  name: string;
  strength: number;
  keyRequired: boolean;
}

export interface ConfigState {
  wifis: Wifi[];
  selectedWifi: string | null;
}

const initialState: ConfigState = {
  wifis: [],
  selectedWifi: null,
};

export const configReducer = (state: ConfigState = initialState, action: ConfigActions): ConfigState => {
  switch (action.type) {
    case UPDATE_NETWORK_ACTION:
      return {
        ...state,
        wifis: action.wifis
      }
    case SELECT_NETWORK_ACTION:
      return {
        ...state,
        selectedWifi: action.name
      }
  }
  return state;
}