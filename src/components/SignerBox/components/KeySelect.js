import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import DropZone from './DropZone';
import read from '../reader';
import open from '../opener';
import { isKey, isOpen, isSigning } from '../utils';
import { sign } from '../sign';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  passwordInput: {
    marginBottom: theme.spacing(3),
  }
}));

const KeySelect = ({ onAdd, material, onSign }) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [keyIdx, setKeyIdx] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);

  const classes = useStyles();

  const handleFile = files => read(files).then((material) => onAdd(material));

  const handleOpen = event => {
    event.preventDefault();
    const key = (material || []).filter(isKey)[keyIdx || 0];

    if (!key) return setError('EPASSWORD');

    const contents = open(key, password);
    if (contents) {
      setError(null);
      setPassword('');

      read([{ name: 'dat', ...key, contents }]).then((more) => onAdd([...material, ...more]));
    } else {
      setError('EPASSWORD');
    }
  }

  const handleSelectKey = e => setKeyIdx(Number(e.target.value));

  const handlePassword = e => setPassword(e.target.value);

  const handleClickShowPassword = () => setShowPassword(prevState => !prevState);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSign = event => {
    event.preventDefault();

    const [key] = (material || []).filter((file) => isOpen(file) && isSigning(file.match));

    onSign(sign.bind(null, key, key.match));
  }

  const keys = (material || []).filter(isKey);
  const signKeys = (material || []).filter((file) => isOpen(file) && isSigning(file.match));
  const [firstKey] = signKeys;
  if (signKeys.length > 1) {
    return (<div>Signing keys found: {signKeys.length}</div>);
  }
  if (signKeys.length === 1) {
    return (<div>
      <button onClick={handleSign}>
        Sign as {firstKey.match.subject.title} {firstKey.match.subject.commonName}
      </button>
    </div>);
  }

  return (
  <div>
    {!keys.length && <DropZone handleDrop={handleFile} text="Select or drop key file" />}

    <form onSubmit={handleOpen}>
      {
        (keys.length > 1) && (
          <select onChange={handleSelectKey}>
            {
              keys.map((key, idx) => <option value={idx} key={idx}>
                {(key.match && key.match.subject)
                  ? (key.match.subject.title || '') + ' ' + (key.match.subject.commonName || '')
                  : (key.name || idx)}
              </option>)
            }
          </select>
        )
      }
      <FormControl fullWidth className={clsx(classes.passwordInput)} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePassword}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    </form>

    {error}

    <div>
      Found keys: {keys.length}
    </div>

  </div>);
}

export default KeySelect;
