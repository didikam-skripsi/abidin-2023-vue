const { defineConfig } = require('@vue/cli-service')
const { config } = require('dotenv');
config();

module.exports = defineConfig({
  transpileDependencies: true
})