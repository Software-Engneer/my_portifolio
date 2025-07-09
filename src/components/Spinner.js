import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({ size = 48, color = '#36d7b7', loading = true, style = {} }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100, ...style }}>
    <ClipLoader size={size} color={color} loading={loading} />
  </div>
);

export default Spinner; 