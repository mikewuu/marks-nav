import toString from 'mdast-util-to-string'
import visit from 'unist-util-visit'
import map from 'unist-util-map'

export const createMarks = tree => createList(parseMarks(tree))

export function parseMarks(tree) {
  // Create map of marks to easily reference them by
  // number later. Allows duplicate text marks, and
  // avoids hashing text values.
  const marks = {}
  let counter = 1

  visit(tree, 'mark', node => {
    marks[toString(node)] = counter
    counter++
  })

  return marks
}

export function hasMarks(marks) {
  return Object.keys(marks).length > 0
}

export function createMarksList(marks) {
  const list = {
    type: 'paragraph',
    children: Object.entries(marks).map(([mark, number]) => ({
      type: 'blockquote',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'link',
              url: `#mark${number}`,
              title: null,
              children: [
                {
                  type: 'text',
                  value: mark
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

function isMark(node) {
  return node.type === 'mark'
}

export function withMarkIds(marks, tree) {
  const res = map(tree, node => {
    if (isMark(node)) {
      const id = `mark${marks[toString(node)]}`

      return {
        ...node,
        data: {
          ...node.data,
          hProperties: {
            id
          },
          id
        }
      }
    }

    return node
  })

  return res
}
