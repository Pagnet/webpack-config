import { merge } from 'webpack-merge';
import { DefinePlugin } from 'webpack';
import commonConfig from './webpack.common';

interface DevConfigProps {
  port: number;
  moduleFederation: any;
  name: string;
  envs: Record<string, string>;
  alias?: Record<string, string>;
}

const devConfig = ({ port, moduleFederation, envs }: DevConfigProps) => ({
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
    moduleFederation,
  ],
});

export default ({ port, moduleFederation, name, alias, envs }: DevConfigProps) => 
  merge(
    commonConfig({ alias, name }) as any,
    devConfig({ port, moduleFederation, name, envs }) as any
  )
