import HtmlWebpackPlugin from "html-webpack-plugin";

interface CommonConfigProps {
  alias?: Record<string, string>;
  name: string;
}

export default ({ alias, name }: CommonConfigProps) => ({
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-react",
              "@babel/preset-env",
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /.mdx$/,
        loader: "ignore-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".png", ".webp"],
    alias,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: name,
      template: "./public/index.html",
    }),
  ],
});
