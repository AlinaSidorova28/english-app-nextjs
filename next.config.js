const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
    webpack(config, options) {
        const { isServer } = options;
        config.module.rules.push({
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            exclude: config.exclude,
            use: [
                {
                    loader: require.resolve('file-loader'),
                    options: {
                        publicPath: '/_next/static/audio/',
                        outputPath: `${isServer ? '../' : ''}static/audio/`,
                    },
                },
            ],
        });

        return config;
    },
};

module.exports = withPlugins([
    withImages,
    { target: 'serverless' },
], nextConfig);
