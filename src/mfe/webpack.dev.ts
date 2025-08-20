import { merge } from 'webpack-merge';
import { DefinePlugin } from 'webpack';
import moduleFederation from './module-federation';
import commonConfig from './webpack.common';

interface DevConfigProps {
  port: number;
  exposes: Record<string, string>;
  remotes: Record<string, string>;
  name: string;
  envs: Record<string, string>;
  alias?: Record<string, string>;
}

const devConfig = ({ port, exposes, remotes, name, envs }: DevConfigProps) => ({
  mode: 'development',

  output: {
    publicPath: envs.PUBLIC_PATH,
  },

  devServer: {
    port: port,
    historyApiFallback: true,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(envs),
    }),
    moduleFederation({ name, exposes, remotes }),
  ],
});

export default ({ port, exposes, remotes, name, alias, envs }: DevConfigProps) => 
  merge(
    commonConfig({ alias, name }) as any,
    devConfig({ port, exposes, remotes, name, envs }) as any
  )
