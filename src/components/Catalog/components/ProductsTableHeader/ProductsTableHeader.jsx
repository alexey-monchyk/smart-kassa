import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './useStyles';

const ProductsTableHeader = ({ title, handleFilterByName, handleOpenDialog }) => {
  const classes = useStyles();

  const handleSearchInputChange = e => handleFilterByName(e.target.value);

  return (
    <div className={classes.header}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <div className={classes.actions}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            onChange={handleSearchInputChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Button
          onClick={handleOpenDialog}
          startIcon={<AddIcon />}
          color="secondary"
          variant="contained"
        >
          Додати товар
        </Button>
      </div>
    </div>
  );
};

ProductsTableHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleFilterByName: PropTypes.func.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};

export default ProductsTableHeader;
