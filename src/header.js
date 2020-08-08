const HEADER_TEXT = 'marks'

export const findMarksHeaderIndex = tree =>
  tree.children.findIndex(node => {
    const isHeader = node.type === 'heading'
    if (!isHeader) {
      return
    }

    const textVal = node.children[0].value.toLowerCase()
    return textVal === HEADER_TEXT
  })
