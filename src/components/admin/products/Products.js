import React from 'react';
import './Products.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import ProductForm from './ProductForm';
import ProductList from './ProductList';

function AddNewProduct (props) {
  return (
    <>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={12}>
          {/* Form input product */}
            <ProductList />
        </Grid>
      </Grid>
    </>
  )
}

function ManageProducts () {
  return(
    <>
      <AddNewProduct />
    </>
  );
}

export default ManageProducts;
