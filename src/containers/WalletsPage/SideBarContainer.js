import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWalletAddress, setActiveWallet } from '../../actions/wallet';
import SideBar from '../../components/WalletsPage/SideBar';

class SideBarContainer extends Component {
  render() {
    if (Object.values(this.props.wallets).length === 0) return null;

    return <SideBar {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    wallets: state.wallet.list,
    activeWallet: state.wallet.activeWallet,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveWallet: id => dispatch(setActiveWallet(id)),
    fetchWalletAddress: id => dispatch(fetchWalletAddress(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
