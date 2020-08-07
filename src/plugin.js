import visit from 'unist-util-visit'
import toString from 'mdast-util-to-string'
import map from 'unist-util-map'

// This is a remark plugin, so it receives the tree
export function marksPlugin() {
  return tree => {
    console.log(tree)
    const marks = parseMarks(tree)
    const updated = withMarkIds(tree, marks)
    const marskHeaderIndex = findMarksHeaderIndex(tree)

    const hasMarksSection = marskHeaderIndex !== -1
    if (!hasMarksSection) {
      return
    }

    const list = createList(marks)
    if (!list) {
      return
    }

    console.log('tree', tree)
    updated.children.splice(marskHeaderIndex + 1, 0, list)
    tree.children = updated.children
    console.log('updated', updated)
  }

  // Find position for mark
  // Array.from(document.querySelectorAll('strong')).find( el => el.textContent === 'mark:').offsetTop

  // Scroll to mark
  // const preview = document.querySelector('.mde-preview')
  // preview.scrollTop(mark.offsetTop)
}

function parseMarks(tree) {
  const marks = []

  visit(tree, 'strong', node => {
    if (isMark(node)) {
      marks.push(toString(node))
    }
  })

  return marks
}

function isMark(node) {
  // Use toString() util in case node contains other markup (ie. links)
  const text = toString(node)
  const markRegex = /.*\:$/
  return markRegex.test(text)
}

function findMarksHeaderIndex(tree) {
  return tree.children.findIndex(node => {
    const isHeader = node.type === 'heading'
    if (!isHeader) {
      return
    }

    const textVal = node.children[0].value.toLowerCase()

    return textVal === 'marks'
  })
}

function createList(marks) {
  const hasMarks = marks.length > 0
  if (!hasMarks) {
    return null
  }

  const withoutColon = mark => mark.slice(0, -1)
  const link = mark =>
    `#${mark
      .toLowerCase()
      .replace(/ /g, '')
      .slice(0, -1)}`

  const list = {
    type: 'list',
    ordered: false,
    spread: false,
    start: null,
    children: marks.map(mark => ({
      type: 'listItem',
      checked: null,
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'link',
              url: link(mark),
              title: null,
              children: [
                {
                  type: 'text',
                  value: withoutColon(mark)
                }
              ]
            }
          ]
        }
      ]
    }))
  }

  return list
}

function withMarkIds(tree) {
  const res = map(tree, node => {
    if (isMark(node)) {
      return {
        ...node,
        data: {
          hProperties: {
            id: `${toString(node)
              .toLowerCase()
              .replace(/ /g, '')
              .slice(0, -1)}`
          },
          id: `${toString(node)
            .toLowerCase()
            .replace(/ /g, '')
            .slice(0, -1)}`
        }
      }
    }

    return node
  })

  console.log('result', res)
  return res
}
