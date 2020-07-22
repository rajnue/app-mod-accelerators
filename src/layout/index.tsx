import React from 'react';
import { Sidebar } from 'src/components/common/sidebar';
import styled from 'styled-components';
import transitions from '@material-ui/core/styles/transitions';
import createSpacing from '@material-ui/core/styles/createSpacing';

export const Layout = props => {
  return (
    <LayoutStyle>
      <Sidebar opened={true} />
      <WorkSpace>{props.children}</WorkSpace>
    </LayoutStyle>
  );
};

const WorkSpace = styled.main`
  transition: ${transitions.create('margin', {
    easing: transitions.easing.sharp,
    duration: transitions.duration.leavingScreen,
  })};
  padding: ${createSpacing(1)};
  width: 100%;
`;
const LayoutStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
`;
