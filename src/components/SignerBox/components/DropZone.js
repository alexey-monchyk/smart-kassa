import React from 'react';
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dropzone: {
    border: '1px dashed #ffb549',
    padding: theme.spacing(4, 10),
    minWidth: '500px',
    margin: theme.spacing(2, 0),
    borderRadius: '6px',
  }
}));

const DropZone = ({ handleDrop, text }) => {
  const classes = useStyles();

  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <div className="container">
          <div
            {...getRootProps({
              className: classes.dropzone,
            })}
          >
            <input {...getInputProps()} />
            <p>{text.toUpperCase()}</p>
          </div>
        </div>
      )}
    </Dropzone>
  )
};

export default DropZone;
