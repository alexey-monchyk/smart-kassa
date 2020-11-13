import React from 'react';

import DropZone from './DropZone';

import { readFile } from '../filereader';

const FileSelect = (props) => {
  const handleFile = files => {
    const [file] = files;

    if (!file) return null;

    return readFile(file).then(props.onAdd);
  }

  return (
    <form>
      <DropZone handleDrop={handleFile}  text="Select or drop file to sign" />
    </form>
  );
}

export default FileSelect;
