const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0 0px 10px rgba(0, 0, 0, 0.15)'
  },
  tabsFlexContainer: {
    height: 64,
  },
  avatar: {
    margin: '0 20px',
    background: theme.palette.primary.dark
  },
  grow: {
    flexGrow: 1
  }
});

export default styles;
