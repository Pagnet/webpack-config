interface ModuleFederationProps {
  dev?: boolean;
}

export default ({}: ModuleFederationProps) => ({
  filename: 'remoteEntry.js',
  dts: {
    generateTypes: true,
    consumeTypes: true,
    tsConfigPath: './tsconfig.types.json',
  },
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
