import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const fontTitle = ['Oswald', 'sans-serif'].join(',');
const fontBody = ['Lato', 'sans-serif'].join(',');

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2c374c' },
    secondary: { main: '#663366' },
    background: { default: '#2c374c', paper: '#f0f0f0' },
    text: {
      primary: '#2c374c',
      secondary: '#663366',
      disabled: 'rgb(86, 95, 111)',
      hint: 'rgb(86, 95, 111)'
    }
  },
  typography: {
    useNextVariants: true,
    headline: { fontFamily: fontTitle, color: '#f0f0f0' },
    h5: { fontFamily: fontTitle, color: '#f0f0f0' },

    title: { fontFamily: fontTitle, color: '#f0f0f0' },
    h6: { fontFamily: fontTitle, color: '#f0f0f0' },

    display1: { fontFamily: fontTitle, color: '#f0f0f0' },
    h4: { fontFamily: fontTitle, color: '#f0f0f0' },

    display2: { fontFamily: fontTitle, color: '#f0f0f0' },
    h3: { fontFamily: fontTitle, color: '#f0f0f0' },

    display3: { fontFamily: fontTitle, color: '#f0f0f0' },
    h2: { fontFamily: fontTitle, color: '#f0f0f0' },

    display4: { fontFamily: fontTitle, color: '#f0f0f0' },
    h1: { fontFamily: fontTitle, color: '#f0f0f0' },

    subheading: { fontFamily: fontBody, color: '#f0f0f0' },
    subtitle1: { fontFamily: fontBody, color: '#f0f0f0' },

    body1: { fontFamily: fontBody, color: '#f0f0f0' },
    body2: { fontFamily: fontBody, color: '#2c374c' },

    button: { fontFamily: fontBody, color: '#f0f0f0' },
    caption: { fontFamily: fontBody, color: '#2c374c' },
    fontFamily: fontBody
  },
  overrides: {}
});

export { theme as customTheme };

export default Component => props => (
  // MuiThemeProvider makes the theme available down the React tree thanks to React context.
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Component {...props} />
  </MuiThemeProvider>
);
