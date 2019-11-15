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
import { useDispatch } from 'react-redux';

import up0000 from '../migrations/0000-setup';
import { replace } from 'connected-react-router';

const StartRunner: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function update() {
      await up0000();
      dispatch(replace('/NetworkChecker'));
    }
    
    update();
  }, [dispatch])


  return (
    <div>
      <div className="loading no-mouse">
        <p><i className="fas fa-spinner fa-spin"></i></p>
        <p>正在啟動⋯⋯</p>
      </div>
    </div>
  );
}

export default StartRunner;
