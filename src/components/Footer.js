import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: '0.75rem',
    right: '0.75rem',
    flexGrow: 1,
  },
  copyright: {
    textAlign: 'center',
  }
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <AppBar position="static">
            <Typography className={classes.copyright}>
              © 2021 Ron Sala
            </Typography>
        </AppBar>
      </div>
    </div>
  );
};

export default Footer;