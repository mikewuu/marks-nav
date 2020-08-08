"use strict";
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = activate;
exports.deactivate = deactivate;

var _inkdrop = require("inkdrop");

var _plugin = require("./plugin");

function activate() {
  if (!_inkdrop.markdownRenderer) {
    return;
  }

  _inkdrop.markdownRenderer.remarkPlugins.push(_plugin.marksPlugin);
}

function deactivate() {
  if (_inkdrop.markdownRenderer) {
    _inkdrop.markdownRenderer.remarkPlugins = _inkdrop.markdownRenderer.remarkPlugins.filter(plugin => plugin !== _plugin.marksPlugin);
  }
}
//# sourceMappingURL=index.js.map