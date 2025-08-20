import { ModuleFederationPlugin } from '@module-federation/enhanced';
import path from 'path';

interface ModuleFederationProps {
  name: string;
  exposes: Record<string, string>;
  remotes: Record<string, string>;
  dev?: boolean;
}

export default ({ name, exposes, remotes, dev }: ModuleFederationProps) => 
  new ModuleFederationPlugin({
    name,
    filename: 'remoteEntry.js',
    exposes,
    remotes,
    dts: dev ? {
      generateTypes: dev,
      consumeTypes: dev,
      tsConfigPath: path.resolve(__dirname, '../tsconfig.types.json'),
    } : false,
    shared: {
      react: {
        requiredVersion: '18.2.0',
        singleton: true,
      },
      'react-dom': {
        requiredVersion: '18.2.0',
        singleton: true,
      },
      'react-router-dom': {
        singleton: true,
      },
    },
  });
