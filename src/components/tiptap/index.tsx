'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Color from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import StarterKit from '@tiptap/starter-kit'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import TiptapToolbar from '../tiptap-toolbar'

export default function Tiptap({
  value,
  onChange,
}: {
  value: string | undefined
  onChange: (richText: string) => void
}) {
  const editor = useEditor({
    extensions: [
      Color,
      Document,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font bold',
          levels: [2],
        },
      }),
      Paragraph,
      StarterKit.configure({}),
      Text,
      TextStyle,
    ],
    content: value,
    autofocus: true,
    editable: true,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl m-4 focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  return editor ? (
    <div>
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  ) : null
}
