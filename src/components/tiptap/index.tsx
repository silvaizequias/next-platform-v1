'use client'

import { EditorContent, useEditor } from '@tiptap/react'

import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'

export default function TiptapEditorContent() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'comece a escrever um conteúdo incrível...',
      }),
    ],
    content: '..',
    autofocus: true,
    editable: true,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl m-4 //focus:outline-none',
      },
    },
  })

  return editor ? <EditorContent editor={editor} /> : null
}
