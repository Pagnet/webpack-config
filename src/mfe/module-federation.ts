import path from 'path';

interface ModuleFederationProps {
  dev?: boolean;
}

export default ({ dev }: ModuleFederationProps) => ({
  filename: 'remoteEntry.js',
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
