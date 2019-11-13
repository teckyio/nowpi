const { Remote } = window.require ? window.require('hdmi-cec') : { Remote : () => {} };

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