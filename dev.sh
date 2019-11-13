cd build
rsync -ave ssh . pi@$PI_IP:~/nowpi/
ssh pi@$PI_IP DISPLAY=:0 /home/pi/nowpi/electron
cd ..
