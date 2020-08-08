"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMarks = parseMarks;
exports.hasMarks = hasMarks;
exports.createMarksList = createMarksList;
exports.withMarkIds = withMarkIds;
exports.createMarks = void 0;

var _mdastUtilToString = _interopRequireDefault(require("mdast-util-to-string"));

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _unistUtilMap = _interopRequireDefault(require("unist-util-map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createMarks = tree => createList(parseMarks(tree));

exports.createMarks = createMarks;

function parseMarks(tree) {
  // Create map of marks to easily reference them by
  // number later. Allows duplicate text marks, and
  // avoids hashing text values.
  const marks = {};
  let counter = 1;
  (0, _unistUtilVisit.default)(tree, 'mark', node => {
    marks[(0, _mdastUtilToString.default)(node)] = counter;
    counter++;
  });
  return marks;
}

function hasMarks(marks) {
  return Object.keys(marks).length > 0;
}

function createMarksList(marks) {
  const list = {
    type: 'paragraph',
    children: Object.entries(marks).map(([mark, number]) => ({
      type: 'blockquote',
      children: [{
        type: 'paragraph',
        children: [{
          type: 'link',
          url: `#mark${number}`,
          title: null,
          children: [{
            type: 'text',
            value: mark
          }]
        }]
      }]
    }))
  };
  return list;
}

function isMark(node) {
  return node.type === 'mark';
}

function withMarkIds(marks, tree) {
  const res = (0, _unistUtilMap.default)(tree, node => {
    if (isMark(node)) {
      const id = `mark${marks[(0, _mdastUtilToString.default)(node)]}`;
      return { ...node,
        data: { ...node.data,
          hProperties: {
            id
          },
          id
        }
      };
    }

    return node;
  });
  return res;
}
//# sourceMappingURL=marks.js.map