/*
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

const util = window.require ? window.require('util') : { promisify : () => {} };
const exec = window.require ? util.promisify(window.require('child_process').exec) : () => {};
const fs = window.require ? window.require('fs') : { existsSync : () => {}, writeFileSync : () => {}};

export default async function up() {
    if (fs.existsSync('.nowpi-0000-applied')) {
        return;
    }
    console.log(await exec('sudo dpkg -i /home/pi/deb/*.deb'));
    await fs.writeFileSync('.nowpi-0000-applied', '');
}