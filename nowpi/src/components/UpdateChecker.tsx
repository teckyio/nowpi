import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const UpdateChecker: React.FC = () => {

  useEffect(() => {
    fetch('')
  }, [])

  return (
    <div>
      <div className="loading">
        <p><i className="fas fa-spinner fa-spin"></i></p>
        <p>檢查更新⋯⋯</p>
      </div>
    </div>
  );
}

export default UpdateChecker;
