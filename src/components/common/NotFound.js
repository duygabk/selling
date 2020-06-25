import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

class NotFound extends Component {
  render() {
    return (
      <div>
        Page Not Found
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(NotFound);