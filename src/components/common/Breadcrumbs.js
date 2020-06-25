import React from 'react';

import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
  },
}));
export default function BreadCrumb(props) {
  const classes = useStyles();
  const handleClick = () => {
    console.log("Click breadcrumbs");
  }
  return (
    <Breadcrumbs className={classes.root} maxItems={5} aria-label="breadcrumb">
      <Link color="inherit" href="#" onClick={handleClick}>
        Home
      </Link>
      <Link color="inherit" href="#" onClick={handleClick}>
        products
      </Link>
      <Link color="inherit" href="#" onClick={handleClick}>
        bike
      </Link>
      <Typography color="textPrimary">Bike C</Typography>
    </Breadcrumbs>
  );
}