import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import { mask, placeholderChar } from './constants';

const PhoneNumberMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      placeholderChar={placeholderChar}
      showMask
    />
  );
};

PhoneNumberMask.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default PhoneNumberMask;
