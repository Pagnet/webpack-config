import { ModuleFederationPlugin } from '@module-federation/enhanced';

interface ModuleFederationProps {
  name: string;
  exposes: Record<string, string>;
  remotes: Record<string, string>;
}

export default ({ name, exposes, remotes }: ModuleFederationProps) => 
  new ModuleFederationPlugin({
    name,
    filename: 'remoteEntry.js',
    exposes,
    remotes,
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
