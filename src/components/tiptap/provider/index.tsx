'use client'

import { EditorProvider, EditorProviderProps } from '@tiptap/react'
import Color from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'

import TiptapToolbar from '../toolbar'

export default function TiptapProvider(props: EditorProviderProps) {
  const { children } = props

  const extensions = [
    Color,
    Document.extend({ content: 'heading block*' }),
    Heading.configure({
      HTMLAttributes: {
        class: 'text-xl font bold',
        levels: [2],
      },
    }),
    Paragraph,
    Placeholder.configure({
      placeholder: 'comece a escrever um conteúdo incrível...',
    }),
    StarterKit.configure({}),
    Text,
    TextStyle,
  ]

  return (
    <EditorProvider slotBefore={<TiptapToolbar />} extensions={extensions}>
      {children}
    </EditorProvider>
  )
}
