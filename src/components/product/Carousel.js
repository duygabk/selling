import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    position: 'relative',
    border: '1px solid',
    padding: 10,
  },

}));

function HeaderCarousel() {
  const classes = useStyles();
  const { red, blue, green } = require('@material-ui/core/colors');

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Slide direction="right" in={true} timeout={{appear: 10, enter: 10, exit: 10 }} children={<img src="/img/hats.jpg" alt="hat!"/>}>
          
        </Slide>
      </div>
    </React.Fragment>
  );
}

export default HeaderCarousel;