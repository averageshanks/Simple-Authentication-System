import React from 'react';
import './feature-box.css';
import { FaLock, FaUsersCog } from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';

const icons = {
  lock: <FaLock className="icon" />,
  stat: <ImStatsBars className="icon" />,
  colab: <FaUsersCog className="icon" />,
};

const FeatureBox = ({ icon, title, desc }) => {
  return (
    <div className="feature-container">
      <div className="icon-container">{icons[icon]}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{desc}</p>
    </div>
  );
};

export default FeatureBox;
