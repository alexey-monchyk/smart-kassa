import { generateAccessCode } from './utils';

export const initialWorkerFormaValues = {
  name: '',
  surname: '',
  patronymic: '',
  personalIncomeTax: '',
  phoneNumber: '',
  email: '',
  position: '',
  accessCode: generateAccessCode(),
}

export const positions = [
  { id: 1, title: 'Власник' },
  { id: 2, title: 'Адміністратор' },
  { id: 3, title: 'Касир' },
];
