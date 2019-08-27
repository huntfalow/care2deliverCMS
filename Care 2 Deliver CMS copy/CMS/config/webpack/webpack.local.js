var commonConfig = require("./webpack.common.js");

module.exports=Object.assign(commonConfig,{
  devtool: "#source-map"
});
