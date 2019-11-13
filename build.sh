__='
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
'

PREBUILD_ELECTRON=https://github.com/electron/electron/releases/download/v7.1.1/electron-v7.1.1-linux-armv7l.zip

cd nowpi
yarn install
PUBLIC_URL=. yarn build
cd ..
if [ ! -d build ]; then
    mkdir -p build
    cd build
    wget $PREBUILD_ELECTRON
    unzip `basename $PREBUILD_ELECTRON`
    rm `basename $PREBUILD_ELECTRON`
    rm resources/default_app.asar
    cd ..
fi
cd build
mkdir -p resources/app/
cp -rf ../nowpi/electron/* resources/app/
cp -rf ../nowpi/build resources/app/
