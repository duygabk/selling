import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateMenuAction } from '../../../store/action/menuAction';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from  '@material-ui/icons/Delete';
import EditIcon from  '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ArrowDropDownCircleSharpIcon from '@material-ui/icons/ArrowDropDownCircleSharp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { green, red, blue } from '@material-ui/core/colors';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import Notification from '../../common/Notification';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { apiAddNewMenuToServer, apiRemoveMenuFromServer, apiUpdateMenuToServer } from '../../../utils/axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    '& .MuiDialog-paper' : {
      padding: 10,
      backgroundColor: red[100],
    }
  },
  nested: {
    // paddingLeft: theme.spacing(4),
  },
  subMenu: {
    marginLeft: theme.spacing(8),
    marginBottom: 10,
  },
  edit: {
    backgroundColor: blue[800],
    margin: theme.spacing(1),
    padding: 10,
  },
  delete: {
    backgroundColor: red[900],
    marginRight: theme.spacing(1),
    padding: 10,
  },
}));

const EditableText = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [textContent, setTextContent] = useState('');
  const { content, doChangeContent } = props;

  useEffect(() => {
    setTextContent(props.content)
  }, [props.content])

  const hdlEditParentCategory = () => {
    setIsEdit(true);
  }

  const hdlOnKeyDown = e => {
    if (e.key === 'Enter') {
      doChangeContent(textContent);
      setIsEdit(false);
    }
  }

  const hdlOnLoseFocus = () => {
    doChangeContent(textContent);
    setIsEdit(false);
  }

  const hdlUpdateText = e => {
    const text = e.target.value;
    setTextContent(text);
  }

  if (isEdit) return (
    <TextField value={textContent} onKeyDown={hdlOnKeyDown} onBlur={hdlOnLoseFocus} onChange={hdlUpdateText}/>
  )

  return (
    <Typography variant="body1" onClick={hdlEditParentCategory}>{textContent}</Typography>
  )
}

const Confirm = (props) => {
  const { open, onClose, onConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ padding: 20 }}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}  variant="contained">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus variant="contained">
          Remove
        </Button>
      </DialogActions>
    </Dialog>

  )
}

const SubMenuItem = (props) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const { parents, doRemove, doChangeContent, children } = props;

  const hdlRemoveSubMenu = () => {
    // console.log("open confirm");
    setOpen(true);
  }

  const handleRemove = () => {
    doRemove(children);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const hdlChangeContent = text => {
    // console.log(text);
    const buffChild = { ...children };
    buffChild.menu_title = text;
    doChangeContent(buffChild);
  }

  const hdlOpenChangeParent = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const hdlCloseParentMenu = () => {
    setAnchorEl(null);
  }

  const hdlChangeParentMenu = (parent) => {
    const buffChild = { ...children };
    buffChild.parent = parent.id;
    doChangeContent(buffChild);
    setAnchorEl(null);
  }

  const parentList = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={hdlCloseParentMenu}
    >
      {
         parents.map(parent => {
          return(
            <MenuItem onClick={() => hdlChangeParentMenu(parent)}>{parent.menu_title}</MenuItem>
          )
        })
      }
    </Menu>
  )

  return (
    <>
      <ListItem button className={classes.nested}>
        <ListItemIcon>
          <ChevronRightIcon />
        </ListItemIcon>
        <ListItemText>
          <EditableText content={children.menu_title} doChangeContent={hdlChangeContent}/>
        </ListItemText>
        <DeleteIcon style={{color: red[900], marginRight: 1}} onClick={hdlRemoveSubMenu}/>

        <DragIndicatorIcon onClick={hdlOpenChangeParent}/>

        { parentList }

      </ListItem>
      <Divider />

      <Confirm content="Are you sure?" open={open} onConfirm={handleRemove} onClose={handleClose} />

    </>
  )
}

const OneCategory = (props) => {
  const [open, setOpen] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [childrens, setChildrens] = useState([]);
  const [parentTitle, setParentTitle] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);

  const { parents, parent, children, onChangeMenu, onRemoveMenu } = props;

  useEffect(() => {
    setParentTitle(parent.menu_title);
    setChildrens(children);
  }, [props]);

  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  const hdlChangeChildTitle = (child) => {
    onChangeMenu(child);
  }

  const hdlRemoveChildren = child => {
    onRemoveMenu(child)
  }

  const hdlDoAddSubMenu = () => {
    const newChildren = {
      menu_title: "New Children Menu",
      parent: parent.id,
    }
    const buffChilds = [ ...childrens, newChildren]
    setChildrens(buffChilds);
  }

  const hdlChangeParentTitle = text => {
    setParentTitle(text);
    let buffParent = { ...parent };
    buffParent.menu_title = text;
    onChangeMenu(buffParent);
  }

  const hdlOpenRemoveConfirm = () => {
    setOpenConfirm(true);
  }

  const hdlCloseRemoveConfirm = () => {
    setOpenConfirm(false);
  }

  const hdlRemoveParentMenu = () => {
    // send to parent conponent to process remove
    onRemoveMenu(parent);
    setOpenConfirm(false);
  }

  const subMenus =  childrens.length ? childrens.map((child, key) => {
    return <SubMenuItem parents={parents} children={child} key={key} doChangeContent={hdlChangeChildTitle} doRemove={hdlRemoveChildren}/>
  }) : null;

  return (
    <>
      <ListItem button style={{ backgroundColor: green[500], padding: '15px', maxHeight: 50 }}>
        <ListItemIcon>
          <ArrowDropDownCircleSharpIcon />
        </ListItemIcon>

        <ListItemText>
            <EditableText content={parentTitle} doChangeContent={hdlChangeParentTitle} />
        </ListItemText>

        <ListItemSecondaryAction>

          {(parent.id !== 1) ? (
            <>
            <IconButton edge="end" aria-label="delete" className={classes.delete} onClick={hdlOpenRemoveConfirm} >
              <DeleteIcon />
            </IconButton>
            <Confirm content="Are you sure?" open={openConfirm} onConfirm={hdlRemoveParentMenu} onClose={hdlCloseRemoveConfirm} />
            </>
          ) : null}

          <IconButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>

      </ListItem>

      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit className={classes.subMenu}>
        <List component="div" disablePadding>

          { subMenus }

          <br />
          <Button
            fullWidth={true}
            variant="outlined"
            color="primary"
            style={{marginRight: '10px'}}
            onClick={hdlDoAddSubMenu}
          >
            <AddSharpIcon/>
          </Button>
          <Divider />
        </List>
      </Collapse>
    </>
  )
}

const STS_OK = "success";
const STS_ERROR = "error";
const MESS_ADD_MENU_ERROR = "Oop! Add menu error!!!";
const MESS_ADD_MENU_OK = "Success! Add Menu OK";
const MESS_UPDATE_OK = "Success! Update Menu OK";
const MESS_UPDATE_ERROR = "Oop! update menu error!!!";
const MESS_REMOVE_OK = "Success! Remome OK";
const MESS_REMOVE_ERROR = "Oop! Remove menu error!!!";

function Category(props) {

  const { menu, updateMenuToStore } = props;
  const [appMenu, setAppMenu] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [messageNotification, setMessageNotification] = useState("");

  useEffect(() => {
    document.title = "Admin/Category";
    setAppMenu(menu.menu);
    // console.log(menu.menu);
  }, [menu]);

  // console.log(appMenu);

  const classes = useStyles();

  const hdlAddNewParent = () => {
    const buffAppMenu = {
      menu_title: "New Parent",
      parent: 0,
    };
    hdlOnChangeMenu(buffAppMenu);
    // setAppMenu(buffAppMenu);
  }

  const hdlOnChangeMenu = async (menuChange) => {
    // console.log("menu change ", menuChange);
    // check id to classify add new menu or update,
    let apiResponse = null;
    if ( menuChange.id ) {  // update
      // update menu to server
      apiResponse = await apiUpdateMenuToServer(menuChange)
        .then(res => {
          if ( res.data && res.data.error === false ) {
            // update to Store
            const updateMenu = appMenu.map(x => {
              return x.id === menuChange.id ? menuChange : x;
            })
            // console.log(updateMenu);
            updateMenuToStore(updateMenu);
            return { status: STS_OK, message: MESS_UPDATE_OK };
          }
          return { status: STS_ERROR, message: res.data.message };
        })
        .catch(err => {
          // console.log(err.message)
          return { status: STS_ERROR, message: err.message };
        });
    } else { // add new menu
      // console.log("add new menu");
      apiResponse = await apiAddNewMenuToServer(menuChange)
        .then(res => {
          // console.log(res.data);
          if( !res.data ) return;
          if ( res.data && res.data.error === false ) {
            // update store
            // console.log(appMenu);
            const updateMenu = [ ...appMenu, {...menuChange, id: res.data.data.insertId} ];
            // console.log(updateMenu);
            updateMenuToStore(updateMenu);
            return { status: STS_OK, message: MESS_ADD_MENU_OK };
          }
          //
          return {status: STS_ERROR, message: res.data.message };
        })
        .catch(err => {
            // console.log(err.message)
            return { status: STS_ERROR, message: err.message }
        })
    }
    // console.log(apiResponse);
    setShowNotification(true);
    setMessageNotification(apiResponse.message);
  }

  const hdlRemoveMenu = async (removeMenu) => {
    // need remove menu is parent or children, if parent -> move all it's children to common menu
    let needChangeMenu = [];
    let apiResponse = null;
    const { parent } = removeMenu;
    if ( parent === 0 ) {  // parent menu
      needChangeMenu = appMenu.filter( x => x.parent === removeMenu.id );
    }
    // send need delete menu to server
    if ( needChangeMenu.length ) {
      const changeList = needChangeMenu.map(x => {
          return { ...x, parent: 1 }
      })

      apiResponse = await Promise.all(changeList.map(x => apiUpdateMenuToServer(x)));

      setShowNotification(true);
      ( apiResponse && apiResponse.length ) && apiResponse.map(res => {
        console.log(res);
        const mess = res.data.error ? res.data.message : MESS_UPDATE_OK;
        setMessageNotification(mess);
      })
    }

    apiResponse = await apiRemoveMenuFromServer(removeMenu.id)
      .then(res => {
          console.log(res);
          if ( !res ) return { status: STS_ERROR, message: MESS_REMOVE_ERROR };
          if ( res.data && !res.data.error ) {
            // update to store
            const updateMenu = appMenu.filter( x => x.id !== removeMenu.id ).map(x => {
              return ( x.parent === removeMenu.id ) ? { ...x, parent: 1 } : x;
            });
            console.log({ updateMenu });
            updateMenuToStore(updateMenu);
            return { status: STS_OK, message: MESS_REMOVE_OK };
          }
          return { status: STS_ERROR, message: res.data.message };
      })
      .catch(err => {
        return { status: STS_ERROR, message: err.message }
      })
    setShowNotification(true);
    setMessageNotification(apiResponse.message);

  }

  const hdlCloseNotification = () => {
    setShowNotification(false);
  }

  const parents = appMenu.length ? appMenu.filter( x => x.parent === 0 ) : [];

  const showMenus =  parents.length ?  parents.map((parent, key) => {
    // const hideRemove = (key === menus.length - 1) ? true : false;
    const children = appMenu.filter( x => x.parent === parent.id );
    return (
      <OneCategory parents={parents} parent={parent} key={key} children={children} onChangeMenu={hdlOnChangeMenu}  onRemoveMenu={hdlRemoveMenu}/>
    )
  }) : null;

  return (
    <>
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Category List
        </ListSubheader>
      }
      className={classes.root}
    >
      {showMenus}
      <hr />

      <Button
        fullWidth={true}
        variant='contained'
        startIcon={<PlaylistAddIcon />}
        style={{ backgroundColor: green[900], color: 'white' }} onClick={hdlAddNewParent}
      >
        Add New Category
      </Button>

    </List>

    <Notification open={showNotification} message={messageNotification} close={hdlCloseNotification} />
    </>
  );
}

const mapStateToProps = state => {
  return {
    menu: state.menu,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMenuToStore: function (menuToUpdate) {
      dispatch(updateMenuAction(menuToUpdate))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
