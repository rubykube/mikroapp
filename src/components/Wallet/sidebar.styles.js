const sidebarStyles = theme => ({
  drawer: {
    flexShrink: 0,
    width: 400
  },
  drawerPaper: {
    minWidth: 400,
    background: '#F5F5F5'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  listItem: {
    margin: '8px 14px',
    padding: '18px 20px',
    borderRadius: '4px',
    width: 'calc(100% - 28px)',
    background: '#FFFFFF',
    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.12)',
    opacity: 0.6
  },
  textContainer: {
    paddingLeft: 10
  },
  balanceText: {
    textAlign: 'right',
    fontWeight: 600
  },
  lockedIcon: {
    verticalAlign: 'middle',
    height: 14,
    paddingRight: 5,
    opacity: 0.7,
    bottom: 1,
    position: 'relative'
  },
  lockedText: {
    textAlign: 'right'
  },
  titleText: {
    fontWeight: 600
  },
  selectedListItem: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    opacity: 1
  },
  selectedText: {
    // color: theme.palette.primary.main
  },
  selectedIcon: {
    // filter: 'invert(1) brightness(0.5) sepia(1.2) hue-rotate(-45deg) saturate(6)'
  }
});

export default sidebarStyles;
