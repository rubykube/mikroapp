import { createMuiTheme } from '@material-ui/core/styles';

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#F44336'
    },
    secondary: {
      main: '#fff'
    },
    action: {
      selected: '#ffffff'
    }
  },
});

export const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar
});
