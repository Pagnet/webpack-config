import { merge } from 'webpack-merge';
import { DefinePlugin } from 'webpack';
import commonConfig from './webpack.common';
import { ModuleFederationPlugin } from '@module-federation/enhanced'

interface ProdConfigProps {
  moduleFederation: InstanceType<typeof ModuleFederationPlugin>;
  name: string;
  publicPath: string;
  envs: Record<string, string>;
  alias?: Record<string, string>;
}

const prodConfig = ({ moduleFederation, publicPath, envs }: ProdConfigProps) => ({
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
  ],
});

export default ({ moduleFederation, name, alias, publicPath, envs }: ProdConfigProps) => 
  merge(
    commonConfig({ alias, name }) as any,
    prodConfig({ moduleFederation, name, publicPath, envs }) as any
  );
