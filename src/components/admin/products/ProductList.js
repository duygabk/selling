import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const EditableText = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const component = props.component || "p";
  const text = props.value || "";

  const changeMode = () => {
    setIsEdit(true);
  }

  const hdlKeyDown = (e) => {
    if (e.key === "Enter") setIsEdit(false)
  }

  const ret = (!isEdit) ?  (
      <Typography component={component} variant={component} onClick={changeMode} {...props}>
        {text}
      </Typography>
    ) : (
      <TextField type={component} value={text} onKeyDown={hdlKeyDown} {...props}/>
  );

  return ret;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 10,
    marginBottom: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  btnIcon: {
    height: 38,
    width: 38,
  },
}));

function OneProduct (props) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [productName, setProductName] = useState("Plant")

  const changeEditable = () => {
    setIsEdit(true)
  }

  const changeProductName = event => {
    setProductName(event.target.value);
  }

  const hdlOnKeyDown = event => {
    if (event.key === "Enter") {
      setIsEdit(false);
    }
  }

  const prodName =
    (isEdit === false) ? (
      <Typography component="h5" variant="h5" onClick={changeEditable}>
        {productName}
      </Typography>
    ) : (
      <TextField type="h5" value={productName} onChange={changeProductName} onKeyDown={hdlOnKeyDown}/>
    )

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          {prodName}
          <EditableText variant="subtitle1" color="textSecondary"
            value="Product Description"
          />
        </CardContent>
        <div className={classes.controls}>
          <IconButton color="primary" aria-label="Edit">
            <EditIcon className={classes.btnIcon}/>
          </IconButton>
          <IconButton color="secondary" aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="/img/plant.jpg"
        title="Live from space album cover"
      />
    </Card>
  )
}

function ProductList (props) {
  return (
    <div>
      <Grid container xs={12} spacing={1}>
        <OneProduct />
        <OneProduct />
        <OneProduct />
      </Grid>
    </div>
  )
}

export default ProductList;
