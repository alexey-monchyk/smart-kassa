import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';

const CatalogsListItem = ({ catalog, selected, onDelete, editCatalog }) => (
  <ListItem
    component={NavLink}
    to={catalog.id ? `/catalogs/${catalog.id}` : '/catalogs'}
    button
    key={catalog.id}
    selected={selected}
  >
    <ListItemAvatar>
      <FolderIcon />
    </ListItemAvatar>
    <ListItemText
      primary={catalog.name}
      secondary={`${catalog.productsQty} Товарів`}
    />
    {
      catalog.id
      && (
        <ListItemSecondaryAction>
          <IconButton onClick={() => editCatalog(catalog)} edge="end" aria-label="delete">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(catalog.id)} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )
    }

  </ListItem>
);

CatalogsListItem.propTypes = {
  catalog: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    productsQty: PropTypes.number.isRequired,
  }).isRequired,
  selected: PropTypes.bool,
  onDelete: PropTypes.func,
  editCatalog: PropTypes.func,
};

CatalogsListItem.defaultProps = {
  selected: false,
  onDelete: () => {},
  editCatalog: () => {},
};

export default CatalogsListItem;
