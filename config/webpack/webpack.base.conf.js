var path = require("path");
var webpack = require("webpack");
var fs = require("fs");
var entry = require("./webpack.entry.conf");
var json = require('../../package.json');

var newEntry = {};
for (var name in entry) {
    newEntry[name] = entry[name][0]
}
newEntry.vendor = Object.keys(json.dependencies);
var config = {
    entry: newEntry,
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    }
};
module.exports = config;
