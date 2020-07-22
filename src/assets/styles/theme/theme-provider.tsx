import React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { themeConfig } from './config';

export const ThemeProvider = props => {
  return <OriginalThemeProvider theme={themeConfig}>{React.Children.only(props.children)}</OriginalThemeProvider>;
};
