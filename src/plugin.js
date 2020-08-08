import { findMarksHeaderIndex } from './header'
import { parseMarks, hasMarks, createMarksList, withMarkIds } from './marks'

// Remark plugin
export function marksPlugin() {
  return tree => {
    const marskHeaderIndex = findMarksHeaderIndex(tree)
    const hasMarksHeader = marskHeaderIndex !== -1
    if (!hasMarksHeader) {
      return
    }

    const marks = parseMarks(tree)
    if (!hasMarks(marks)) {
      return
    }

    const list = createMarksList(marks)
    const treeWithMarkIds = withMarkIds(marks, tree)

    treeWithMarkIds.children.splice(marskHeaderIndex + 1, 0, list)
    tree.children = treeWithMarkIds.children
  }
}
