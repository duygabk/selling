import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubHeader from '@material-ui/core/ListSubheader';
import CardProduct from '../product/CardProduct';
 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 10,
    margin: 10,
  },
  gridList: {
    // width: '800px',
    // height: 450,
    // padding: 10,
  },
  title: {
    height: 50,
    backgroundColor: '#00796b',
    color: 'white',
    fontWeight: 'bolder',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  item: {
    padding: '16px !important',
  },
}))
function Category () {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight='auto' className={classes.gridList} cols={1}>
        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
          <ListSubHeader component="div" className={classes.title}>Category No.1</ListSubHeader>
        </GridListTile>
        <GridListTile key="Item" style={{ height: 'auto', padding: 10 }}>
          <Grid container spacing={1} >
            <Grid item xs xm={4} spacing={2} className={classes.item}>
              <CardProduct />
            </Grid>
            <Grid item xs xm={4} spacing={1} className={classes.item}>
              <CardProduct />
            </Grid>
            <Grid item xs xm={4} spacing={1} className={classes.item}>
              <CardProduct />
            </Grid>
          </Grid>
        </GridListTile>
      </GridList>
    </div>
  );
}

export default Category;