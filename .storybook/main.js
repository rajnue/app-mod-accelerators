module.exports = {
  addons: [
    '@storybook/addon-viewport/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
    '@storybook/addon-actions/register',
    '@storybook/addon-jest/register',
    '@storybook/addon-docs/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],
};
