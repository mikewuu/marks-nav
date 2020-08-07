import visit from 'unist-util-visit'
import toString from 'mdast-util-to-string'

// This is a remark plugin, so it receives the tree
export function marksPlugin() {
  return tree => {
    const marks = parseMarks(tree)
    console.log('marks', marks)
    console.log('tree', tree)

    const marskHeaderIndex = findMarksHeaderIndex(tree)

    const hasMarksSection = marskHeaderIndex !== -1
    if (!hasMarksSection) {
      return
    }

    const list = createList(marks)
    if (!list) {
      return
    }

    tree.children.splice(marskHeaderIndex + 1, 0, list)
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
    // Use toString() util in case node contains other markup (ie. links)
    const text = toString(node)
    const markRegex = /.*\:$/

    const isMark = markRegex.test(text)

    if (isMark) {
      marks.push(text)
    }
  })

  return marks
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

  const link = mark => `#mark__${mark.trim()}`
  const withoutColon = mark => mark.slice(0, -1)

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
