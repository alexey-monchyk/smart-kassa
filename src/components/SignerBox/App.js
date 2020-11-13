import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

import './App.css';
import {
  FileSelect,
  KeySelect,
  Material,
} from './components';
import {makeMatches} from './match';
import save from './save';
import certfetch from './certfetch';

function fetchMissing(material) {
  const [key1, key2] = material.filter((file)=> (
    (file.type === 'Priv') && !file.match
  ));

  return key1 ? certfetch([key1, key2]) : Promise.reject();
}

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(5),
  }
}));

const App = () => {
  const [material, setMaterial] = React.useState([]);
  const [file, setFile] = React.useState(null);

  const classes = useStyles();

  const handleAdd = async material => {
    setMaterial(makeMatches(material));

    try {
      const certificates = await fetchMissing(material);

      if (!certificates) return;

      setMaterial(prevState => [...prevState, ...certificates]);
    } catch(e) {}
  }

  const handleChangeFile = file => setFile(file);

  const handleSign = signFn => {
    signFn(file.contents).then((signedContents)=> save(signedContents, file.name + '.p7s'));
  }

  return (
    <ThemeProvider theme={createMuiTheme({ palette: { type: 'dark' } })}>
    <div className="App">
      <div className="container">
      <CssBaseline />
      <Typography className={classes.title} variant="h5">Signerbox2</Typography>
      {file
        ? (<p>Signing file "{file.name}"</p>)
        : (<FileSelect onAdd={handleChangeFile} />)}
      <KeySelect material={material} onAdd={handleAdd} onSign={handleSign} />
      <Material value={material} />
    </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
