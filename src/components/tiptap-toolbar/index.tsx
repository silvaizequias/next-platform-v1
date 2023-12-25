'use client'

import { Editor } from '@tiptap/react'

interface Props {
  editor: Editor | null
}

export default function TiptapToolbar(props: Props) {
  const { editor } = props

  return editor ? '' : null
}
