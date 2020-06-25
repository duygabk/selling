import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPrevIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Typography from '@material-ui/core/Typography';
import { IconButton, Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // maxWidth: 350,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    width: 40,
    height: 40,
  },
  cover: {
    width: 151,
  },
  content: {
    flex: '1 0 auto'
  }
}));

export default function OneCard (props) {
  
  const classes = useStyles();
  const theme = useTheme();
  console.log({theme})
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" component="text" color="textSecondary">
            duygabk
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton area-label="previous">
            <SkipPrevIcon/>
          </IconButton>
          <IconButton area-label="play/pause" >
            <PlayArrowIcon className={classes.playIcon}/>
          </IconButton>
          <IconButton area-label="next">
            <SkipNextIcon/>
          </IconButton>
        </div>
      </div>
      <CardMedia
       className={classes.cover}
       image="/img/camera.jpg"
       title="live"
       />
    </Card>
  );
}