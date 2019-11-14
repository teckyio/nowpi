cd home
rsync -ave ssh . pi@$PI_IP:/home/pi/
cd ..
cd nowpi/dist/
scp *.AppImage pi@$PI_IP:/home/pi/nowpi.AppImage
ssh pi@$PI_IP DISPLAY=:0 /home/pi/nowpi.AppImage
