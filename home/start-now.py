'''
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
'''

from omxplayer.player import OMXPlayer
import threading
import subprocess
import requests
import json
import cec
import time

requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'DEFAULT:!DH'

channels = ["332", "331"]
order = 0

def stream_channel(stop_event):
    while True:
        res = requests.post("https://hkt-mobile-api.nowtv.now.com/09/1/getLiveURL", json={
            "channelno": channels[order % len(channels)],
            "mode": "prod",
            "audioCode": "",
            "format": "HLS",
            "callerReferenceNo": "20140702122500",
        })

        urls = res.json()
        url = urls["asset"]["hls"]["adaptive"][0]

        p = subprocess.Popen(["ffmpeg", "-re", "-i", url, "-fflags", "+genpts+igndts", "-c", "copy", "-f", "mpegts", "udp://localhost:1234"])
        while not stop_event.wait(1) and p.poll() is None:
            pass
        p.terminate()
        stop_event.clear()

def cec_key_press(event, cmd, value, *args):
    global order, player

    print(cmd, value)
    if value > 0:
        if cmd == 1:
            order = order - 1
        if cmd == 2:
            order = order + 1
        t_channel_stopper.set()
        player.quit()

def restart_player(*args):
    global player

    player = OMXPlayer("udp://localhost:1234")
    player.exitEvent = restart_player

cec.init()
cec.add_callback(cec_key_press, cec.EVENT_KEYPRESS)

t_channel_stopper = threading.Event()
t_channel = threading.Thread(target=stream_channel, args=(t_channel_stopper, ))
t_channel.start()

player = OMXPlayer("udp://localhost:1234")
player.exitEvent = restart_player