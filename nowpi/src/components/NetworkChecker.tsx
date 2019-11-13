import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace } from 'connected-react-router';
import { RootState } from '../redux/store';
import { Wifi } from '../redux/config/reducer';
import { updateNetwork } from '../redux/config/action';
import { remote } from '../cec';
import { KeyEvent } from 'hdmi-cec';

const { spawn } = window.require ? window.require('child_process') : { spawn : () => {} };

const NetworkChecker: React.FC = () => {
  const dispatch = useDispatch();
  const wifis = useSelector<RootState, Wifi[]>(state => state.config.wifis);
  const wifiList = useRef<HTMLDivElement>(null)

  const [showWifi, setShowWifi] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState<string | null>(null);

  useEffect(() => {
    function onRemoteKeydown(event: KeyEvent) {
      let current = wifis.findIndex(wifi => wifi.name === selectedWifi)
      if (event.keyCode == 1) {
        current -= 1;
      } else if (event.keyCode == 2) {
        current += 1;
      }
      const index = Math.max(Math.min(current, wifis.length - 1), 0);
      setSelectedWifi(wifis[index].name);

      const wifiListDom = wifiList.current;
      if (wifiListDom != null) {
        wifiListDom.scrollTo(0, Math.max((wifiListDom.scrollHeight / wifis.length) * (index - 1), 0));
      }
    }

    remote.on('keydown', onRemoteKeydown)

    return () => {
      remote.off('keydown', onRemoteKeydown);
    }
  }, [remote, selectedWifi, setSelectedWifi, wifis]);

  useEffect(() => {
    function onOnline() {
      dispatch(replace('/UpdateCheck'));
    }

    if (!navigator.onLine) {
      onOnline();

      return;
    } else {
      window.addEventListener('online', onOnline);

      const showWifiTimer = window.setTimeout(() => {
        setShowWifi(true);
      }, 1000);

      let updateWifiTimer: number | null = null;

      const scanWifi = () => {
        spawn('sudo', ['wpa_cli', '-i', 'wlan0', 'scan']);
  
        updateWifiTimer = window.setTimeout(() => {
          const results = spawn('sudo', ['wpa_cli', '-i', 'wlan0', 'scan_results']);

          results.stdout.on('data', (data: any) => {
            const wifiLines = data.toString().split('\n');
            wifiLines.shift(); // skip the first line

            const wifisNew: Wifi[] = [];

            for (let wifiLine of wifiLines) {
              const wifiComponent = wifiLine.split('\t');
              if (wifiComponent.length <= 1) {
                continue;
              }
              if (wifisNew.find(wifi => wifi.name == wifiComponent[4])) {
                continue;
              }
              wifisNew.push({
                name: wifiComponent[4],
                strength: parseInt(wifiComponent[2]),
                keyRequired: wifiComponent[3].indexOf('PSK') > -1
              })
            }

            dispatch(updateNetwork(wifisNew));
          });
        }, 2000);
      }
  
      const updateWifiInterval = window.setInterval(scanWifi, 10000);
      scanWifi();

      return () => {
        updateWifiTimer && window.clearTimeout(updateWifiTimer);
        window.clearTimeout(showWifiTimer);
        window.clearInterval(updateWifiInterval);
        window.removeEventListener('online', onOnline);
      }
    }
  }, [navigator, setShowWifi, dispatch])

  return (
    <div>
      { ! showWifi ? 
        <div className="loading">
          <p><i className="fas fa-spinner fa-spin"></i></p>
          <p>檢查網絡⋯⋯</p>
        </div>
      :
        <div className="content">
          <h3>請選擇網絡</h3>
          <div className="wifi-list" ref={wifiList}>
            {
              wifis.map(wifi => (
                <div className={selectedWifi == wifi.name ? 'selected' : ''}>
                  <p>{ wifi.name }</p>
                  { wifi.keyRequired ? <i className="fas fa-lock"></i> : null}
                </div>
              ))
            }
          </div>
          { selectedWifi != null && <a className="button"><span className="function-button red"></span>下一步</a> }
        </div>
      }
    </div>
  );
}

export default NetworkChecker;

