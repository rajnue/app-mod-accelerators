import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import createSpacing from '@material-ui/core/styles/createSpacing';

const StateCardStyle = styled(Card)`
  .content {
    position: relative;
    padding: 16px;
    &:last-child {
      padding-bottom: ${createSpacing(2)};
    }
  }
  .icon {
    box-shadow: none;
    color: white;
  }
  .iconFloat {
    position: absolute;
    right: 15px;
    top: 50%;
    margin-top: -20px;
    opacity: 0.2;
    transform: rotate(-5deg);
  }
  .lightText {
    color: 'white';
  }
`;

const StatCard = (props: StatProps) => {
  const { type, title, value, icon, color } = props;
  let before = null;
  let after = null;

  const cardIcon = (
    <Grid item className={type === 'fill' ? 'iconFloat' : null}>
      <IconButton className="icon" aria-label={title} style={{ backgroundColor: color }}>
        {icon}
      </IconButton>
    </Grid>
  );

  if (icon) {
    type === 'fill' ? (after = cardIcon) : (before = cardIcon);
  }

  return (
    <StateCardStyle style={type === 'fill' ? { backgroundColor: color } : null}>
      <CardContent className="content">
        <Grid container alignItems="center" direction="row" justify="flex-start">
          {before}
          <Grid item>
            <div className={type === 'fill' ? 'pr-1' : 'px-1'}>
              <Typography variant="h6" className={type === 'fill' ? 'lightText' : null}>
                {value}
              </Typography>
              <Typography variant="caption" className={type === 'fill' ? 'lightText' : null}>
                {title}
              </Typography>
            </div>
          </Grid>
          {after}
        </Grid>
      </CardContent>
    </StateCardStyle>
  );
};

interface StatProps {
  type: string;
  title: string;
  value: string;
  icon: any;
  color: string;
}

export default StatCard;
