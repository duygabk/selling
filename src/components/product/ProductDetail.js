import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import PrevIcon from '@material-ui/icons/SkipPreviousRounded';
import NextIcon from '@material-ui/icons/SkipNextRounded';
import CardIcon from '@material-ui/icons/ShoppingCartOutlined'
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Divider } from '@material-ui/core';
import CardProduct from './CardProduct';

const gridStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '100%',
  },
  gridList: {

  },
  img: {
    height: 60,
    width: 'auto',
  },
  button: {
    width: '30px !important',
    height: '60px !important',
  }
}));
function SingleLineGrid () {
  const classes = gridStyles();

  const OneItem = (props) => {
    return (
      <GridListTile>
        <img src={`./img/${props.img}.jpg`} alt="image1" className={classes.img} />
      </GridListTile>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          <IconButton className={classes.button}>
            <PrevIcon/>
          </IconButton>
          <OneItem key="1" img="hats"/>
          <OneItem key="2" img="honey"/>
          <OneItem key="3" img="morning"/>
          <OneItem key="4" img="plant"/>
          <IconButton className={classes.button}>
            <NextIcon/>
          </IconButton>
        </GridList>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    width: '100%',
    // height: 1000,
    // backgroundColor: '#fff2e6',
    boxSizing: 'border-box',
  },
  title: {
    backgroundColor: '#339966',
    color: '#ffffff',
    fontWeight: 'bolder',
    height: '45px',
    lineHeight: '45px',
    padding: 5,
    textAlign: 'center',
  },
  productImg: {
    // backgroundColor: '#804000',
    // height: 500,
    textAlign: 'center',
    padding: 10,
  },
  img: {
    height: 350,
    width: 'auto',
    // display: 'block',
  },
  productInfo: {
    textAlign: 'left',
    borderLeft: '1px solid #b3e6ff',
    paddingLeft: 50,
    '& p' : {
      marginTop: 20,
    }
  },
  productSpec: {
    textAlign: 'left',
    padding: 20,
  },
  productComment: {

  },
  productRelate: {
    padding: 50,
  },
}));

function ProductDetail () {
  const classes = useStyles();

  const changeCountProduct = (event) => {
    console.log(event.target.value)
  }

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={0} square>
        <Typography className={classes.title}>Product Name</Typography>
        <Grid container xs className={classes.productImg}>
            {/* Product Image */}
            <Grid item xs sm={6} spacing={2}>
              <img src="./img/hats.jpg" alt="hats" className={classes.img} />
              <SingleLineGrid />
            </Grid> {/* end Product Image */}
            {/* Product Price, add to Card... */}
            <Grid item xs sm={6} spacing={2} className={classes.productInfo}>
              <Typography variant="h5" style={{ color: '#00111a', fontWeight: 'bolder' }}>
                Product Name
              </Typography>
              <Typography variant="body1" component="p">
                Code: <Chip color="primary" label="XYZ000011111"/>
              </Typography>
              <Typography variant="subtitle1" component="p">
                Price: <Chip color="secondary" label="1000$"/>
              </Typography>
              <Typography variant="subtitle2" component="p">
                Count: 
                <Select
                  style={{ marginLeft: 20, width: 50, textAlign: 'center' }}
                  defaultValue={1}
                  onChange={changeCountProduct}
                  // input={<TextField />}
                  // variant="filled"
                  >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </Typography>
              <Typography variant="body2" component="p">
                <Button color="secondary" variant="contained">
                  <CardIcon/> Add to Card
                </Button>
              </Typography>
              <Typography variant="body2" component="p">
                Review: 
                <code>
                CSS border-radius Property
                The CSS border-radius property defines the radius of an element's corners.

                Tip: This property allows you to add rounded corners to elements! 
                </code>
              </Typography>
            </Grid> {/* end Product Price, add to card ... */}            
        </Grid>
        {/* Product's specification */}
        <Grid container xs={12} className={classes.productSpec}>
          <Grid item xs spacing={2}>
            <Typography variant="h4" component="h4">
              Product information
            </Typography>
            <Divider />
            <Typography variant="caption" component="p" color="textSecondary">
              Specification of product No.XYZ000011111
            </Typography>
            <p>
              <code>
              With the CSS box-sizing Property
              The box-sizing property allows us to include the padding and border in an element's total width and height.

              If you set box-sizing: border-box; on an element, padding and border are included in the width and height:

              Both divs are the same size now!

              Hooray!

              Here is the same example as above, with box-sizing: border-box; added to both  elements:
              </code>
            </p>
            <p>
              <code>
              With the CSS box-sizing Property
              The box-sizing property allows us to include the padding and border in an element's total width and height.

              If you set box-sizing: border-box; on an element, padding and border are included in the width and height:

              Both divs are the same size now!

              Hooray!

              Here is the same example as above, with box-sizing: border-box; added to both  elements:
              </code>
            </p>
            <p>
              <code>
              With the CSS box-sizing Property
              The box-sizing property allows us to include the padding and border in an element's total width and height.

              If you set box-sizing: border-box; on an element, padding and border are included in the width and height:

              Both divs are the same size now!

              Hooray!

              Here is the same example as above, with box-sizing: border-box; added to both  elements:
              </code>
            </p>
          </Grid>
        </Grid>
        {/* comment about this product */}
        <Grid container xs className={classes.productComment}>
          comment
        </Grid>
        {/* Product Relation */}
        <h5>Relate Products:</h5>
        <Grid container xs className={classes.productRelate}>          
          <Grid item xs={12} sm={4} spacing={2}>
            <CardProduct />
          </Grid>
          <Grid item xs={12} sm={4} spacing={2}>
            <CardProduct />
          </Grid>
          <Grid item xs={12} sm={4} spacing={2}>
            <CardProduct />
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default ProductDetail;