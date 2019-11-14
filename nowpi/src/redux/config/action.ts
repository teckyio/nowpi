/**
 
===========================================================================

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

===========================================================================

Alex Lau
(c) Tecky Academy Limited 2019

===========================================================================

*/
import { Wifi } from "./reducer";

export const UPDATE_NETWORK_ACTION = "@@config/UPDATE_NETWORK_ACTION";
export const SELECT_NETWORK_ACTION = "@@config/SELECT_NETWORK_ACTION";
export const SET_NETWORK_PASSWORD_ACTION = "@@config/SET_NETWORK_PASSWORD_ACTION";

export interface SelectNetworkAction {
  type: typeof SELECT_NETWORK_ACTION;
  name: string;
}

export interface SetNetworkPasswordAction {
  type: typeof SET_NETWORK_PASSWORD_ACTION;
  password: string | null;
}

export interface UpdateNetworkAction {
  type: typeof UPDATE_NETWORK_ACTION;
  wifis: Wifi[];
}

export type ConfigActions = UpdateNetworkAction | SelectNetworkAction | SetNetworkPasswordAction;

export function selectNetwork(name: string): SelectNetworkAction {
  return {
    type: SELECT_NETWORK_ACTION,
    name
  }
}
export function setNetworkPassword(password: string | null): SetNetworkPasswordAction {
  return {
    type: SET_NETWORK_PASSWORD_ACTION,
    password
  }
}
export function updateNetwork(wifis: Wifi[]): UpdateNetworkAction {
  return {
    type: UPDATE_NETWORK_ACTION,
    wifis
  }
}

