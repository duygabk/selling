import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, Typography, CardContent, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 200,
    width: '100%',
    display: 'flex',
    marginTop: 10,
    border: '1px solid #889977',
    padding: 20,
    boxSizing: 'border-box',
  },
  media: {
    display: 'flex',
    '& .MuiCardMedia-root:hover': {
      opacity: 0.7,
      transformDelay: 1,
    }
  },
  image: {
    maxHeight: 180,
    width: 200,
    height: '100%',
  },
  description: {
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  }
}));

function PostCard () {
  const classes = useStyles();
  const date = new Date();
  return (
    <>
      <Card className={classes.wrapper}>
        <div className={classes.media}>
          <Link><CardMedia className={classes.image}image="/img/bike.jpg" title="image"/></Link>
        </div>
        <div className={classes.decription}>
          <CardContent>
            <Typography variant="h5" component="h5" className={classes.title}>
              Post Title
            </Typography>
            <Typography variant="body1" component="p">
              Post Description
            </Typography>
            <Typography variant="caption">
              Poster / <code>{date.getTime()}</code> 
            </Typography>
          </CardContent>
        </div>
      </Card>
    </>
  );
}

export default PostCard;
