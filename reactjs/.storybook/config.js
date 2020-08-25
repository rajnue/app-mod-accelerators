import { configure } from '@storybook/react';
import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

const req = require.context('../src', true, /.stories.(tsx|mdx)$/);
function loadStories() {
  return req
    .keys()
    .map(req)
    .filter((req) => Boolean(req.default));
}
const customViewPorts = {
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
  DesktopLarge: {
    name: 'Large Desktop',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
};

addParameters({
  viewport: { viewports: customViewPorts },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
configure(loadStories, module);
