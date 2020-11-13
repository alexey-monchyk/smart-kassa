import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { canSign, canEnc, isCA } from '../utils';
import save from '../save';

class Saveable extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(event) {
    event.preventDefault();
    const { file } = this.props;
    save(file._raw || file.to_asn1(), file.name || (file.type || file.format) + '.dat');
  }

  render() {
    const { file, children } = this.props;
    return (file.to_asn1 || file._raw)
      ? (<span>{children} (<button role="link" onClick={this.handleSave}>save file</button>)</span>)
      : children;
  }
}

class Part extends Component {
  render() {
    const { type, format, subject, extension, name, match } = this.props;

    if (subject) {
      return (<span>{format} {subject.title} {subject.commonName} {canSign(extension.keyUsage) && 'SIGN'} {canEnc(extension.keyUsage) && 'ENC'} {isCA(extension.keyUsage) && 'CA'}</span>);
    }
    if (format === 'jks-key' && match) {
      return (<span>Encrypted Key {name} for <Part {...match} /></span>);
    }
    if (format === 'IIT' || format === 'jks-key' || format === 'PBES2') {
      return (<span>Encrypted Key {name}</span>);
    }
    if (format) {
      return (<span>{format} ?</span>);
    }
    if (type === 'Priv' && match) {
      return (<span>Private key for <Part {...match} /></span>);
    }
    if (type === 'Priv') {
      return (<span>Private key without match</span>);
    }

    return null;
  }
}

class Material extends Component {
  render() {
    const { value } = this.props;

    if (!value) return null;

    return (
      <List subheader={<ListSubheader>Key Material and Certificates</ListSubheader>}>
        {
          value.map((part, idx) => (
            <ListItem key={idx}>
              <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
              <Saveable file={part}>
                <Part {...part} />
              </Saveable>
            </ListItem>
          ))
        }
      </List>
    );
  }
}

export default Material;
