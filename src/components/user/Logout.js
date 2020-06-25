import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

class Logout extends Component {
  render() {
    return (
      <div>
        Log Out
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Logout);