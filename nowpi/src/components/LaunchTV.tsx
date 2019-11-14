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
const { spawn } = window.require ? window.require('child_process') : { spawn : () => {} };

const LaunchTV: React.FC = () => {
  useEffect(() => {
    const proc = spawn('python3', ['/home/pi/start-now.py'])
    
    // proc.stdout.on('data', console.log)
    // proc.stderr.on('data', console.log)
    // proc.on('exit', () => console.log('process closed'));

    return () => {
      proc.kill();
    };
  }, [])

  return (
    <div>
      <div className="loading hide-mouse">
        <p><i className="fas fa-asterisk fa-spin"></i></p>
        <p>轉台中</p>
      </div>
    </div>
  );
}

export default LaunchTV;
