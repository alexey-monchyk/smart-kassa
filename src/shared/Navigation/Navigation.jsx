import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  IconButton, Toolbar, Drawer, Divider, List, ListItem, ListItemText, Typography, ListItemIcon,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Group as GroupIcon,
  LocalAtm as LocalAtmIcon,
  LocalMall as LocalMallIcon,
  Ballot as BallotIcon,
  AccountCircle,
} from '@material-ui/icons';
import clsx from 'clsx';

import useStyles from './useStyles';

const Navigation = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const menuItems = [
    { label: t('navBar.items.Outlets'), to: '/', icon: <LocalMallIcon /> },
    { label: t('navBar.items.Cash registers'), to: '/cash-registers', icon: <LocalAtmIcon /> },
    { label: t('navBar.items.Personal'), to: '/personal', icon: <GroupIcon /> },
    { label: t('navBar.items.Catalog'), to: '/catalog', icon: <BallotIcon /> },
  ];

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Smart Kassa
          </Typography>
          <IconButton
            aria-label="account of current user"
            className={classes.profileButton}
            aria-haspopup="true"
            edge="end"
            color="inherit"
          >
            <Typography className={classes.userName}>John Doe</Typography>
            <AccountCircle fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map(({ label, to, icon }) => (
            <ListItem
              component={NavLink}
              to={to}
              activeClassName={classes.activeLink}
              exact
              button
              key={label}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

Navigation.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Navigation.defaultProps = {
  children: null,
};

export default Navigation;
