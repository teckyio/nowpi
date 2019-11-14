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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace } from 'connected-react-router';
import { RootState } from '../redux/store';

const fs =  window.require ? window.require('fs') : { };
const { spawnSync } = window.require ? window.require('child_process') : { spawnSync : () => {} };

const NetworkSetup: React.FC = () => {
  const dispatch = useDispatch();
  const wifiName = useSelector<RootState, string | null>(state => state.config.selectedWifi);
  const wifiPassword = useSelector<RootState, string | null>(state => state.config.password);

  useEffect(() => {
    if (wifiName == null) {
      return;
    }

    let configContent;
    if (wifiPassword == null) {
      configContent = `country=HK
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="${wifiName.replace(/"/, '\\"')}"
    key_mgmt=NONE
}`;
    } else {
      configContent = `country=HK
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="${wifiName.replace(/"/, '\\"')}"
    psk="${wifiPassword.replace(/"/, '\\"')}"
}`;
    }

    fs.writeFileSync('wpa_supplicant.conf', configContent);
    spawnSync('sudo', ['cp', 'wpa_supplicant.conf', '/etc/wpa_supplicant/wpa_supplicant.conf'])
    spawnSync('sudo', ['wpa_cli', '-i', 'wlan0', 'reconfigure'])
  }, [wifiName, wifiPassword])

  useEffect(() => {
    function onOnline() {
      dispatch(replace('/UpdateCheck'));
    }

    if (navigator.onLine) {
      onOnline();

      return;
    } else {
      window.addEventListener('online', onOnline);

      const fallbackTimer = window.setTimeout(() => {
        dispatch(replace('/'));
      }, 20000);

      return () => {
        window.clearTimeout(fallbackTimer);
        window.removeEventListener('online', onOnline);
      }
    }
  }, [dispatch])

  return (
    <div>
      <div className="loading">
        <p><i className="fas fa-spinner fa-spin"></i></p>
        <p>正在設定網絡⋯⋯</p>
      </div>
    </div>
  );
}

export default NetworkSetup;
