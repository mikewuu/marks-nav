const HEADER_TEXT = 'marks'

export const findMarksHeaderIndex = tree =>
  tree.children.findIndex(node => {
    const isHeader = node.type === 'heading'
    if (!isHeader) {
      return
    }

    const valueNode = node.children[0]
    if (!valueNode) {
      return
    }

    const textVal = valueNode.value.toLowerCase()
    return textVal === HEADER_TEXT
  })
