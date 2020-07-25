import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../store/action/userAction';
import { TOKEN_ITEM } from '../../constants';

function Logout (props) {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    localStorage.removeItem(TOKEN_ITEM);
    props.removeCurrentUser();
    setRedirect(true);
  }, [])
  if (redirect) return <Redirect to="/home" from="/user/logout" />
  return (
    <>
      Logout...
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    removeCurrentUser: () => {
      dispatch(setCurrentUser(null));
    },
  }
}

export default connect(null, mapDispatchToProps)(Logout);
