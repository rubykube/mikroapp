const styles = theme => ({
  drawer: {
    flexShrink: 0,
    width: 400
  },
  drawerPaper: {
    minWidth: 400
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  listItem: {
    margin: '8px 14px',
    padding: '8px 10px',
    borderRadius: '4px',
    width: 'calc(100% - 28px)'
  },
  selectedText: {
    color: theme.palette.primary.main,
    fontWeight: 600
  },
  selectedIcon: {
    filter: 'invert(1) brightness(0.5) sepia(1.2) hue-rotate(-45deg) saturate(6)'
  }
});

export default styles;
