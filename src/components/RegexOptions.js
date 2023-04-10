import React, { useContext, useMemo } from 'react';
import { RegexContext } from '../contexts/RegexContext';

const RegexOptions = ({ t }) => {
  const {
    options,
    changeOption,
    changeCurrentProfile,
    profiles,
    currentProfile,
    playAudio,
  } = useContext(RegexContext);

  const optionItems = useMemo(() => [
    { value: 'option-zero', label: 'Standard' },
    { value: 'option-one', label: 'Keywords' },
    { value: 'option-two', label: 'Blocked Terms' },
    { value: 'option-three', label: 'Negative' },
  ], []);

  const handleOptionChange = (e) => {
    changeOption(e.target.value);
    playAudio();
  };

  const handleProfileChange = (name) => () => {
    changeCurrentProfile(name);
    playAudio();
  };

  return (
    <>
      <div className="col-md-12 mt-3">
        <h3>{t('regex-optionen')}</h3>
        {optionItems.map(({ value, label }) => (
          <div key={value}>
            <input
              type="radio"
              name="option"
              id={value}
              value={value}
              onChange={handleOptionChange}
              checked={options === value}
            />
            <label htmlFor={value} className="check-box-label">
              {label}
            </label>
          </div>
        ))}
      </div>

      <div className="col-md-12 mt-3">
        <h3>{t('regex-profile')}</h3>
        {profiles.map(({ name }) => (
          <div key={name}>
            <input
              type="radio"
              name="profile"
              id={name}
              value={name}
              onChange={handleProfileChange(name)}
              checked={currentProfile === name}
            />
            <label htmlFor={name} className="check-box-label">
              {name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default RegexOptions;
