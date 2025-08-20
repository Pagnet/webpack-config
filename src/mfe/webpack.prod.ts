import { merge } from 'webpack-merge';
import { DefinePlugin } from 'webpack';
import commonConfig from './webpack.common';
import moduleFederation from './module-federation';

interface ProdConfigProps {
  exposes: Record<string, string>;
  remotes: Record<string, string>;
  name: string;
  publicPath: string;
  envs: Record<string, string>;
  alias?: Record<string, string>;
}

const prodConfig = ({ exposes, remotes, name, publicPath, envs }: ProdConfigProps) => ({
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: publicPath,
  },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(envs),
    }),
    moduleFederation({ name, exposes, remotes }),
  ],
});

export default ({ exposes, remotes, name, alias, publicPath, envs }: ProdConfigProps) => 
  merge(
    commonConfig({ alias, name }) as any,
    prodConfig({ exposes, remotes, name, publicPath, envs }) as any
  );
