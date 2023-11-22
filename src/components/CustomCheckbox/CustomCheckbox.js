import React, { useState } from 'react';
import './CustomCheckbox.scss'; // Create this file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const CustomCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="custom-checkbox-label">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="custom-checkbox-input"
      />
    </label>
  );
};

export default CustomCheckbox;

