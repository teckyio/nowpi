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
import { EventEmitter } from "eventemitter3";

const { Remote } = window.require ? window.require('hdmi-cec') : { Remote : class KeyboardRemote extends EventEmitter {
  constructor() {
    super();

    document.addEventListener('keydown', event => {
      if (event.keyCode == 38) {
        this.emit('keydown', {
          keyCode: CEC_KEY_UP
        })
      } else if (event.keyCode == 40) {
        this.emit('keydown', {
          keyCode: CEC_KEY_DOWN
        })
      } else if (event.keyCode == 37) {
        this.emit('keydown', {
          keyCode: CEC_KEY_LEFT
        })
      } else if (event.keyCode == 39) {
        this.emit('keydown', {
          keyCode: CEC_KEY_RIGHT
        })
      } else if (event.keyCode == 32) {
        this.emit('keydown', {
          keyCode: CEC_KEY_OK
        })
      } else if (event.keyCode == 13) {
        this.emit('keydown', {
          keyCode: CEC_KEY_GREEN
        })
      } else if (event.keyCode == 8) {
        this.emit('keydown', {
          keyCode: CEC_KEY_RED
        })
      }
    })
  }
} };

export const CEC_KEY_OK = 0;
export const CEC_KEY_UP = 1;
export const CEC_KEY_DOWN = 2;
export const CEC_KEY_LEFT = 3;
export const CEC_KEY_RIGHT = 4;
export const CEC_KEY_RED = 72;
export const CEC_KEY_GREEN = 73;
export const CEC_KEY_YELLOW = 74;
export const CEC_KEY_BLUE = 71;

export const remote = new Remote();