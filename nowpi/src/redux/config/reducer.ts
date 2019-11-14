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
import { ConfigActions, UPDATE_NETWORK_ACTION, SELECT_NETWORK_ACTION, SET_NETWORK_PASSWORD_ACTION } from "./action";

export interface Wifi {
  name: string;
  strength: number;
  keyRequired: boolean;
}

export interface ConfigState {
  wifis: Wifi[];
  selectedWifi: string | null;
  password: string | null;
}

const initialState: ConfigState = {
  wifis: [],
  selectedWifi: null,
  password: null,
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
        selectedWifi: action.name,
        password: null
      }
    case SET_NETWORK_PASSWORD_ACTION:
      return {
        ...state,
        password: action.password
      }
  }
  return state;
}