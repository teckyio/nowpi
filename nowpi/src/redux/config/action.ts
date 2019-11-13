import { Wifi } from "./reducer";

export const UPDATE_NETWORK_ACTION = "@@config/UPDATE_NETWORK_ACTION";
export const SELECT_NETWORK_ACTION = "@@config/SELECT_NETWORK_ACTION";

export interface SelectNetworkAction {
  type: typeof SELECT_NETWORK_ACTION;
  name: string;
}

export interface UpdateNetworkAction {
  type: typeof UPDATE_NETWORK_ACTION;
  wifis: Wifi[];
}

export type ConfigActions = UpdateNetworkAction | SelectNetworkAction;

export function selectNetwork(name: string): SelectNetworkAction {
  return {
    type: SELECT_NETWORK_ACTION,
    name
  }
}
export function updateNetwork(wifis: Wifi[]): UpdateNetworkAction {
  return {
    type: UPDATE_NETWORK_ACTION,
    wifis
  }
}

