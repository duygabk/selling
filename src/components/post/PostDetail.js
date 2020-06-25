import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
  },
}));

function PostDetail () {
  const classes = useStyles();
  return (
    <>
      <div className={classes.wrapper}>
        <Typography variant="h5" component="h5">Post Title</Typography>
      </div>
    </>
  )
}

export default PostDetail;