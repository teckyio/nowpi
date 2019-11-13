import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const UpdateRunner: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, [navigator, dispatch])

  return (
    <div>
      <div className="loading">
        <p><i className="fas fa-spinner fa-spin"></i></p>
        <p>正在更新</p>
      </div>
    </div>
  );
}

export default UpdateRunner;
