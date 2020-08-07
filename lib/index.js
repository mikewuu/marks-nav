"use strict";
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = activate;
exports.deactivate = deactivate;

var _inkdrop = require("inkdrop");

var _plugin = require("./plugin");

var _anchor = require("./anchor");

function activate() {
  if (!_inkdrop.markdownRenderer) {
    return;
  }

  _inkdrop.markdownRenderer.remarkPlugins.push(_plugin.marksPlugin);

  if (!inkdrop.isMobile) {// setMarksLink()
  }
}

function deactivate() {
  if (_inkdrop.markdownRenderer) {
    _inkdrop.markdownRenderer.remarkPlugins = _inkdrop.markdownRenderer.remarkPlugins.filter(plugin => plugin !== _plugin.marksPlugin);
  }
}

let originalAnchor = null;

function setMarksLink() {
  originalAnchor = _inkdrop.markdownRenderer.remarkReactComponents.a;
  const markLink = (0, _anchor.createMarkAnchor)(originalAnchor);
  _inkdrop.markdownRenderer.remarkReactComponents.a = markLink;
}
//# sourceMappingURL=index.js.map