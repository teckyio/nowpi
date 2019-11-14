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
import React, { useState, useCallback, useEffect } from 'react';
import { KeyEvent } from 'hdmi-cec';
import { remote, CEC_KEY_OK, CEC_KEY_UP, CEC_KEY_DOWN, CEC_KEY_LEFT, CEC_KEY_RIGHT } from '../cec';
import { replace } from 'connected-react-router';

export const SHIFT_KEY = Symbol('Shift Key');
export const BACKSPACE_KEY = Symbol('Backspace Key');

const defaultLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
  ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
  ['u', 'v', 'w', 'x', 'y', 'z', ',', '.', '/', '\\'],
  [SHIFT_KEY,';', '\'', '[', ']', '=', '-', '`', ' ',BACKSPACE_KEY],
]

const defaultLayoutShifted = [
  ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y', 'Z', '<', '>', '?', '|'],
  [SHIFT_KEY,':', '"', '{', '}', '+', '_', '~', ' ',BACKSPACE_KEY],
]

export interface TVKeyboardProps {
  layout?: (string | typeof SHIFT_KEY)[][],
  layoutShifted?: (string | typeof SHIFT_KEY)[][],
  input: React.RefObject<HTMLInputElement>,
}

const TVKeyboard: React.FC<TVKeyboardProps> = props => {
  const layout = props.layout || defaultLayout;
  const layoutShifted = props.layoutShifted || defaultLayoutShifted;

  const [isShifted, setIsShifted] = useState(false);
  const [position, setPosition] = useState(-1);
  const currentLayout = isShifted ? layoutShifted : layout;

  const inputKey = useCallback((key?: string) => {
    const inputDom = props.input.current;
    if (inputDom == null) {
      return;
    }

    if (key === 'Symbol(Shift Key)') {
      setIsShifted(shifted => !shifted);
    } else if (key === 'Symbol(Backspace Key)') {
      inputDom.value = inputDom.value.substring(0, inputDom.value.length - 1);
    } else {
      inputDom.value += key;
    }
  }, [props.input, props.input.current]);

  const onKeyClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    inputKey(event.currentTarget.dataset.key)
  }, [props.input, inputKey]);

  useEffect(() => {
    function onRemoteKeydown(event: KeyEvent) {
      if (event.keyCode == CEC_KEY_UP) {
        setPosition(position => {
          if (position >= currentLayout[0].length) {
            return position - currentLayout[0].length
          } else {
            return position;
          }
        })
      } else if (event.keyCode == CEC_KEY_DOWN) {
        setPosition(position => {
          console.log(position);
          console.log(currentLayout[0].length * (currentLayout.length - 1));
          if (position < currentLayout[0].length * (currentLayout.length - 1)) {
            return position + currentLayout[0].length
          } else {
            return position;
          }
        })
      } else if (event.keyCode == CEC_KEY_LEFT) {
        setPosition(position => {
          if (position % currentLayout[0].length == 0) {
            return position + currentLayout[0].length - 1;
          } else {
            return position - 1;
          }
        })
      } else if (event.keyCode == CEC_KEY_RIGHT) {
        setPosition(position => {
          if (position % currentLayout[0].length == currentLayout[0].length - 1) {
            return position - currentLayout[0].length + 1;
          } else {
            return position + 1;
          }
        })
      } else if (event.keyCode == CEC_KEY_OK) {
        setPosition(position => {
          inputKey(currentLayout[Math.floor(position / currentLayout[0].length)][position % currentLayout[0].length].toString())
          return position;
        });
      } else {
        return;
      }
    }

    remote.on('keydown', onRemoteKeydown)

    return () => {
      remote.off('keydown', onRemoteKeydown);
    }
  }, [remote, setPosition, currentLayout, inputKey]);

  return (
    <div className="keyboard">
      { currentLayout.map((row, i) => (
        <div className="row" key={i}>
          { row.map((key, j) => (
            <div className={i * currentLayout[0].length + j == position ? "key active" : "key"} key={j} onClick={onKeyClick} data-key={key.toString()}>
              {key === SHIFT_KEY && <i className="fas fa-caret-square-up"></i> }
              {key === BACKSPACE_KEY && <i className="fas fa-backspace"></i> }
              {key}
            </div>
          )) }
        </div>
      )) }
    </div>
  );
}

export default TVKeyboard;

