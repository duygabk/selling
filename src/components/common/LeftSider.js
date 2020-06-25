import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setSelectedMenu } from '../../store/action/commonAction';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import blueGrey from '@material-ui/core/colors/blueGrey';
import blue from '@material-ui/core/colors/blue';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    maxWidth: 350,
    backgroundColor: blueGrey[800],
    color: blue[50],
    fontWeight: 'bolder',
  },
  collapse: {
    paddingLeft: theme.spacing(4),
  }
}));

const OneMenuItem = (props) => {
  const [open, setOpen] = useState(false);
  const { parent, children, setSelectedMenu } = props;

  useEffect(() => {

  }, []);

  const hdlOpenSubMenu = () => {
    setOpen(!open);
    if ( !children.length ) {
      setSelectedMenu(parent);
    }
  }
  const classes = useStyles();

  const hdlSelectedMenu = (menu) => {
    setSelectedMenu(menu);
  }

  const menuTitle = parent.menu_title;

  const subMenuItem = children.length ? children.map((child, key) => {
    return (
      <ListItem button className={classes.collapse} key={key} onClick={() => hdlSelectedMenu(child)}>
        <ListItemText primary={child.menu_title} />
      </ListItem>
    )
  }) : null;

  return (
    <>
      <ListItem button onClick={hdlOpenSubMenu}>
        <ListItemText primary={menuTitle} />
        { children.length ? (open ? <ExpandLess/> : <ExpandMore/>) : null }
      </ListItem>
      <Collapse in={open}  unmountOnExit>
        <List component="div" disablePadding>
          { subMenuItem }
        </List>
      </Collapse>
      <Divider />
    </>
  )
}

function LeftSider(props) {
  const classes = useStyles();
  const { menu } = props.menu;
  const { setCurrentMenu } = props;
  // const [open, setOpen] = useState(false);
  const [appMenu, setAppMenu] = useState([]);
  useEffect(() => {
      setAppMenu(menu);
  },[props.menu])

  console.log("sidebar -> ", appMenu);

  let parentItems = [];
  // show menu: get parent item
  if ( appMenu.length ) {
    parentItems = appMenu.filter(x => x.parent === 0);
  }

  const hdlSetSelectedMenu = (currMenu) => {
    // console.log({currMenu});
    setCurrentMenu(currMenu);
  }

  const menuListItem = (parentItems.length) ? parentItems.map((parent, key) => {
    const children = appMenu.filter(x => x.parent === parent.id);
    return <OneMenuItem parent={parent} children={children} key={key} setSelectedMenu={hdlSetSelectedMenu}/>
  }) : null;

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">

      { menuListItem }

    </List>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentMenu: (currMenu) => {
      dispatch(setSelectedMenu(currMenu))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSider);
