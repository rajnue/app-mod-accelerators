import { withKnobs, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import React from 'react';
import StatCard from './index';

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .add('StatCard', () => (
    <div style={{ backgroundColor: 'white', padding: 40 }}>
      <StatCard
        type={select('type', ['fill'], 'fill')}
        title={text('Title', 'Campaigns')}
        value={text('value', '11')}
        icon={<LocalOfferIcon />}
        color={text('color', 'red')}
      />
    </div>
  ));
