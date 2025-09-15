import { merge } from 'webpack-merge';
import { DefinePlugin } from 'webpack';
import { ModuleFederationPlugin } from '@module-federation/enhanced'
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
import commonConfig from './webpack.common';

interface ProdConfigProps {
  moduleFederation: InstanceType<typeof ModuleFederationPlugin>;
  name: string;
  publicPath: string;
  envs: Record<string, string>;
  alias?: Record<string, string>;
}

const prodConfig = ({ moduleFederation, publicPath, envs, name }: ProdConfigProps) => ({
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: publicPath,
  },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(envs),
    }),
    moduleFederation,
    sentryWebpackPlugin({
      org: 'blu-ip-ltda',
      project: `$mfe-${name}`,
      authToken: envs.MFE_SENTRY_AUTH_TOKEN,
    }),
  ],
});

export default ({ moduleFederation, name, alias, publicPath, envs }: ProdConfigProps) => 
  merge(
    commonConfig({ alias, name }) as any,
    prodConfig({ moduleFederation, name, publicPath, envs }) as any
  );
