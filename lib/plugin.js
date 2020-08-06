"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.marksPlugin = marksPlugin;

function marksPlugin() {
  return node => {
    console.log(node); // Can modify children directly here!
  };
}
//# sourceMappingURL=plugin.js.map