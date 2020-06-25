import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
// import { blueGrey, indigo } from '@material-ui/core/colors';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import AssignmentIndSharpIcon from '@material-ui/icons/AssignmentIndSharp';
import  HomeIcon  from '@material-ui/icons/Home';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly'
import HelpIcon from '@material-ui/icons/Help';
import ContactlessIcon from '@material-ui/icons/Contactless';
import { Button, Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    }
  },
  menuButton2: {
    marginLeft: theme.spacing(1),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    margin: theme.spacing(1),
    fontWeight: 'bolder',
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [mobileSider, setMobileSider] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMobileSider = Boolean(mobileSider);

  const handleProfileMenuOpen = (event) => {
    console.log("Open menu: ", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const closeMobileSider = () => {
    setMobileSider(null);
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderUserBtn = (
    <>
    <Button 
      variant="outlined"
      color="default" 
      startIcon={<AssignmentIndSharpIcon/>}
      className={classes.button}
    >
      Login
    </Button>

    <Button
     color="default"
     variant="outlined"
     endIcon={<PersonAddSharpIcon/>}
     className={classes.button}
    >
      Signup
    </Button>
    </>
  );

  const renderDesktopMenu = (
    <>
      <MenuItem>
        <IconButton edge="end" className={classes.menuButton2} color="inherit">
          <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem>
        <IconButton edge="end" className={classes.menuButton2} color="inherit">
          <ChildFriendlyIcon />
        </IconButton>
        <p>Products</p>
      </MenuItem>
      <MenuItem>
        <IconButton edge="end" className={classes.menuButton2} color="inherit">
          <ContactlessIcon/>
        </IconButton>
        <p>Contact</p>
      </MenuItem>
      <MenuItem>
        <IconButton edge="end" className={classes.menuButton2} color="inherit">
          <HelpIcon/>
        </IconButton>
        <p>About</p>
      </MenuItem>
    </>
  );

  const renderMobileSider = (
    <Menu 
      id="menu-mobile"
      anchorEl={mobileSider}
      anchorOrigin={{
        horizontal: "left",
        vertical: "top"
      }}
      transformOrigin={{vertical: 'top', horizontal: 'left'}}
      keepMounted
      open={isMobileSider}
      onClose={closeMobileSider}
    >
      {renderDesktopMenu}
    </Menu>
  );

  const showMenuMobile = (event) => {
    // console.log(event.currentTarget)
    setMobileSider(event.currentTarget);
  }

  const getSearchText = event => {
    console.log(event.currentTarget.value)
  }

  return (
    <div className={classes.grow} style={{ backgroundColor: '#fff' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={showMenuMobile}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            tuyenbn
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              // onBlur={(e) => console.log(e)}
              onChange={getSearchText}
            />
          </div>
          <div className={classes.grow} >
            <div className={classes.sectionDesktop}>
              {renderDesktopMenu}
            </div>
          </div>
          <div className={classes.sectionDesktop}>
            {/* show login / signup button */}
            {renderUserBtn}
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderMobileSider}
    </div>
  );
}
