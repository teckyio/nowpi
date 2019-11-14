import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace } from 'connected-react-router';
import { RootState } from '../redux/store';
import { remote, CEC_KEY_RED } from '../cec';
import { KeyEvent } from 'hdmi-cec';
import TVKeyboard from './TVKeyboard';

const NetworkPassword: React.FC = () => {
  const dispatch = useDispatch();
  const selectedWifi = useSelector<RootState, string>(state => state.config.selectedWifi || '');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onRemoteKeydown(event: KeyEvent) {
      if (event.keyCode == CEC_KEY_RED) {
        dispatch(replace('/'));
      } else {
        return;
      }
    }

    remote.on('keydown', onRemoteKeydown)

    return () => {
      remote.off('keydown', onRemoteKeydown);
    }
  }, [remote, dispatch]);

  return (
    <div>
      <div className="content">
        <h3>網絡 { selectedWifi } 需要密碼</h3>
        <div className="wifi-password">
          <input type="text" placeholder="請輸入密碼" ref={input} />
          <TVKeyboard input={input} />
        </div>
        <div className="buttons">
          <a className="button"><span className="function-button red"></span>上一步</a>
          <a className="button"><span className="function-button green"></span>確認</a>
        </div>
      </div>
    </div>
  );
}

export default NetworkPassword;
