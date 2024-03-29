const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    headers: [
      {
        key: 'Cross-Origin-Embedder-Policy',
        value: 'require-corp'
      },
      {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin'
      }
    ]
  }
})
