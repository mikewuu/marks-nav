'use babel'

import { markdownRenderer } from 'inkdrop'
import { marksPlugin } from './plugin'

export function activate() {
  if (markdownRenderer) {
    markdownRenderer.remarkPlugins.push(marksPlugin)
  }
}

export function deactivate() {
  if (markdownRenderer) {
    markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
      plugin => plugin !== marksPlugin
    )
  }
}
