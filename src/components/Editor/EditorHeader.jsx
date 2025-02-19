import { EditorContent, mergeAttributes, useEditor, Node } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

const CustomDocumentForHeader = Document.extend({
  content: 'title',
})

const Title = Node.create({
  name: 'title',
  // eslint-disable-next-line space-before-function-paren
  addOptions() {
    return {
      level: 1,
      HTMLAttributes: {},
    }
  },
  content: 'text*',
  marks: '',
  group: 'block',
  defining: true,

  // eslint-disable-next-line space-before-function-paren
  renderHTML({ HTMLAttributes }) {
    return [
      'h1',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ]
  },
})

const EditorHeader = ({ isEditable, currentNote, titleEdited }) => {
  useEffect(() => {
    if (headerEditorInstance) {
      headerEditorInstance.commands.setContent(currentNote.note.header)
      titleEdited(headerEditorInstance.getJSON())
    }
  }, [currentNote])

  const headerEditorInstance = useEditor({
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    // Header extension
    extensions: [
      StarterKit.configure({
        document: false,
      }),
      CustomDocumentForHeader,
      Title.configure({
        HTMLAttributes: {
          class: 'text-[40px] text-[#d4d4d4] font-bold',
        },
      }),
      Placeholder.configure({
        emptyNodeClass:
          'before:text-[#adb5bd] before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none',
        showOnlyCurrent: false,
        placeholder: ({ node }) => {
          if (node.type.name === 'title') {
            return 'Untitled'
          }
        },
      }),
    ],
    content: currentNote.note.header,
    onUpdate: () => {
      titleEdited(headerEditorInstance.getJSON())
    },
  })

  useEffect(() => {
    if (headerEditorInstance) {
      headerEditorInstance.setEditable(isEditable)
    }
  }, [isEditable, headerEditorInstance])

  return <EditorContent className='mb-8 w-full' editor={headerEditorInstance} />
}

export default EditorHeader
