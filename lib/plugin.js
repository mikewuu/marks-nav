"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.marksPlugin = marksPlugin;

var _header = require("./header");

var _marks = require("./marks");

// Remark plugin
function marksPlugin() {
  return tree => {
    const marskHeaderIndex = (0, _header.findMarksHeaderIndex)(tree);
    const hasMarksHeader = marskHeaderIndex !== -1;

    if (!hasMarksHeader) {
      return;
    }

    const marks = (0, _marks.parseMarks)(tree);

    if (!(0, _marks.hasMarks)(marks)) {
      return;
    }

    const list = (0, _marks.createMarksList)(marks);
    const treeWithMarkIds = (0, _marks.withMarkIds)(marks, tree);
    treeWithMarkIds.children.splice(marskHeaderIndex + 1, 0, list);
    tree.children = treeWithMarkIds.children;
  };
}
//# sourceMappingURL=plugin.js.map