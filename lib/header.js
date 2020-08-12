"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMarksHeaderIndex = void 0;
const HEADER_TEXT = 'marks';

const findMarksHeaderIndex = tree => tree.children.findIndex(node => {
  const isHeader = node.type === 'heading';

  if (!isHeader) {
    return;
  }

  const valueNode = node.children[0];

  if (!valueNode) {
    return;
  }

  const textVal = valueNode.value.toLowerCase();
  return textVal === HEADER_TEXT;
});

exports.findMarksHeaderIndex = findMarksHeaderIndex;
//# sourceMappingURL=header.js.map