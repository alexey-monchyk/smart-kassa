import PropTypes from 'prop-types';

export const createdWorkerShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  patronymic: PropTypes.string.isRequired,
  personalIncomeTax: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  accessCode: PropTypes.number.isRequired,
});
