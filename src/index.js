'use babel'

import { markdownRenderer } from 'inkdrop'
import { marksPlugin } from './plugin'
import { createMarkAnchor } from './anchor'

export function activate() {
  if (!markdownRenderer) {
    return
  }

  markdownRenderer.remarkPlugins.push(marksPlugin)

  if (!inkdrop.isMobile) {
    // setMarksLink()
  }
}

export function deactivate() {
  if (markdownRenderer) {
    markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
      plugin => plugin !== marksPlugin
    )
  }
}

let originalAnchor = null

function setMarksLink() {
  originalAnchor = markdownRenderer.remarkReactComponents.a
  const markLink = createMarkAnchor(originalAnchor)
  markdownRenderer.remarkReactComponents.a = markLink
}
