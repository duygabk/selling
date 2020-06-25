import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
// import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';
import AppBar from '../common/AppBar';
import LeftSider from '../common/LeftSider';
import OneCard from '../product/OneCard';
import CardProduct from '../product/CardProduct';
import { Container, Tooltip, Fab, Divider } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import AppFooter from '../common/AppFooter';
import BreadCrumbs from '../common/Breadcrumbs';
import Category from '../product/Category';
import Supporter from '../supporter/Supporter';
import ProductDetail from '../product/ProductDetail';
import ChatBox from '../chat/ChatBox';
// Admin page
import Admin from '../admin/Admin';
import Login from '../user/Login';
import Logout from '../user/Logout';
import SignUp from '../user/SignUp';
import NotFound from '../common/NotFound';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../store/action/userAction';
import { loadMenuAction } from '../../store/action/menuAction';
import { apiGetUserFromToken } from '../../utils/axios';
import { TOKEN_ITEM } from '../../constants';
const useStyles = makeStyles((theme) => ({

  container: {
    marginTop: 10,
  },
  fab: {
    position: 'fixed',
    bottom: 10,
    right: 10,
  },
  leftSider: {
    [theme.breakpoints.down("xs")]: {
      display: 'none',
    }
  },
  supporter: {

  },
}));

function User () {
  const { path } = useRouteMatch();
  return(
    <Switch>
      <Route path={`${path}/login`} component={Login}/>
      <Route path={`${path}/signup`} component={SignUp}/>
      <Route path={`${path}/logout`} component={Logout}/>
    </Switch>
  )
}

const loadAppInfo = async function () {
  let appInfo = Object.create(null);
  const token = localStorage.getItem(TOKEN_ITEM);
  if (token) {
    const userInfo = await apiGetUserFromToken(token);
  }

}

function App(props) {

  const { appMenu } = props;

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_ITEM);
    if (token) {
      // console.log("App...");
      apiGetUserFromToken(token)
        .then(res => {
          // get current user info and push to store
          if(res.data.error === false) {
            props.setCurrentUser(res.data.data)
          }
          })
        .catch(err => {
            console.log(err.message);
        })
    }
    props.loadAppMenu();
  }, []);

  // when Menu is changed
  useEffect( () => {
    console.log({appMenu});
  }, [appMenu])

  const classes = useStyles();

  const { path } = useRouteMatch();

  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  // console.log({path});
  return (
    <div className="App">
      <AppBar />
      <Container className={classes.container}>
        <Switch>
          <Route path={`/user`} component={User}/>
          <Route path={`/home`} render={() => (<>Home</>)}>

                    <Grid container xs={12} spacing={1} direction="row">

                      <Grid item xm={4} className={classes.leftSider}>
                        <LeftSider/>
                      </Grid>

                      <Grid item xs xm={8} direction="row">
                        <BreadCrumbs/>
                        <br/><br/>
                        <Grid container spacing={2}>

                          <Grid item xs={12} sm={4} spacing={2}>
                            {/* <Product/> */}
                            <CardProduct />
                          </Grid>
                          <Grid item xs={12} sm={4} spacing={2}>
                            <OneCard />
                          </Grid>
                          <Grid item xs={12} sm={4} spacing={2}>
                            <OneCard />
                          </Grid>
                        </Grid>

                      </Grid>

                    </Grid>
                    {/* product list and supporter */}
                    <Grid container xs={12} spacing={1} direction="row">
                      <Grid item xs sm={9} spacing={2}>
                        {/* start product list */}
                        <Grid container spacing={2}>
                          <Category />
                        </Grid>
                        <br />
                        <hr />
                        <Grid container spacing={2}>
                          <Category />
                        </Grid>
                        {/* end product list */}
                      </Grid>
                      <Grid item sm={3} spacing={2}>
                        <Supporter />
                      </Grid>
                    </Grid> {/* end product list and supporter */}
                    <hr />
                    {/* test Product detail page */}
                    <Grid container xs={12} xm={9} spacing={2} style={{ padding: 10 }}>
                      <ProductDetail />
                    </Grid>
                    {/* test Product detail page */}

          </Route>
          <Route path="/admin" component={Admin} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
      <ChatBox />
      <Tooltip title="Back To Top" aria-label="back-to-top">
        <Fab color="default" className={classes.fab} onClick={scrollTop}>
          <ArrowUpwardIcon/>
        </Fab>
      </Tooltip>

      <AppFooter />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    appMenu: state.menu,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (userInfo) => {
      dispatch(setCurrentUser(userInfo))
    },
    loadAppMenu: () => {
      dispatch(loadMenuAction())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
