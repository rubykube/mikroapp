export default theme => ({
  currencyName: {
    paddingTop: 10,
    paddingLeft: 20,
    position: 'relative'
  },
  totalBalance: {
    fontSize: '10pt',
    position: 'absolute',
    right: 10,
    top: 15
  },
  locked: {
    fontSize: '10pt',
    position: 'absolute',
    right: 10,
    bottom: -5
  },
  inner: {
    padding: 20
  },
  fieldset: {
    border: '2px solid gray',
    borderRadius: 5,
    color: 'gray',
    margin: '20px 0',
    marginTop: 50,
    width: 'calc(100% - 20px)',
    wordBreak: 'break-word',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  fieldsetWithdrawal: {
    marginTop: 10,
    textAlign: 'center'
  },
  depositContainer: {
    position: 'relative'
  },
  legend: {
    fontSize: '9pt',
    color: 'gray'
  },
  description: {
    fontSize: '10pt',
    color: '#666666'
  },
  tabWrapper: {
    display: 'inline',
  },
  verticalMiddle: {
    verticalAlign: 'middle'
  },
  labelIcon: {
    paddingTop: 0,
    minHeight: 60
  },
  btn: {
    width: 'calc(100% - 20px)',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  withdrawalAmount: {
    width: '100%'
  },
  caption: {
    width: 'calc(100% - 20px)',
    position: 'relative'
  },
  allActionText: {
    padding: 10
  },
  mobileTabs: {
    background: '#FAFAFA'
  },
  qrCode: {
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: '100% !important'
    }
  },
  cellRoot: {
    padding: '10px'
  },
  filterIcon: {
    float: 'right',
    padding: '20px 10px'
  },
  content: {
    flexGrow: 1,
    background: 'white'
    // padding: theme.spacing.unit * 3,
  }
});
