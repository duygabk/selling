import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  p: {
    backgroundColor: "#123456",
    color: "#fff",
    padding: 10,
  }
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [openFlag, setOpenFlag] = useState(false);
  const [status, setStatus] = useState("success");
  const { open } = props;
  // useEffect(() => {
  //   setOpen(props.open);
  //   if ( props.status === "success" || "info" || "error" ) {
  //     setStatus(props.status);
  //   }
  // }, [])

  useEffect(() => {
    // console.log(open);
    setOpenFlag(open);
  }, [open])

  const handleClose = () => {
    setOpenFlag(false);
    props.close();
  };

  // console.log({open: props.open});

  return (
    <div className={classes.root}>
      <Snackbar open={openFlag} autoHideDuration={3000} onClose={handleClose}>
          <p className={classes.p}>{props.message}</p>
      </Snackbar>
    </div>
  );
}
