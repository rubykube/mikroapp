import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from '../Layout';


class TradePage extends Component {
  render() {
    return (
      <Layout>
        <Typography variant="h4" style={{padding: 40}}>Trades coming soon!</Typography>
      </Layout>
    );
  }
}

export default TradePage;
