/* eslint-disable space-before-function-paren */
import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import { mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import BaseHeading from '@tiptap/extension-heading'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeading,
  faParagraph,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons'

const headingLevelClasses = {
  2: {
    size: 'text-3xl',
    marginTop: 'mt-6',
  },
  3: {
    size: 'text-2xl',
    marginTop: 'mt-4',
  },
  4: {
    size: 'text-xl',
    marginTop: 'mt-2',
  },
}

const Heading = BaseHeading.configure({ levels: [2, 3, 4] }).extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level = hasLevel ? node.attrs.level : this.options.levels[0]

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${headingLevelClasses[level].size} ${headingLevelClasses[level].marginTop} text-[rgba(255,255,255,0.81)] font-medium first:mt-0`,
      }),
      0,
    ]
  },
})

const EditorBody = ({ isEditable, currentNote, bodyEdited }) => {
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(currentNote.note.body)
      bodyEdited(editor.getJSON())
    }
  }, [currentNote])

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'focus:outline-hidden',
      },
    },
    extensions: [
      StarterKit.configure({
        heading: false,
        paragraph: {
          HTMLAttributes: {
            class: 'text-base text-[rgba(255,255,255,0.81)] mt-1 first:mt-0',
          },
        },
      }),
      Heading,
      TaskList,
      TaskItem.configure({
        nested: false,
        HTMLAttributes: {
          class: 'flex gap-1 items-start mt-2',
        },
      }),
      Placeholder.configure({
        emptyNodeClass:
          'before:text-[#adb5bd] before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none',
        showOnlyCurrent: false,
        placeholder: ({ node }) => {
          if (node.type.name === 'title') {
            return 'Untitled'
          } else if (node.type.name === 'heading') {
            return `Heading ${node.attrs.level - 1}`
          }
          return 'Can you add some further context?'
        },
      }),
    ],
    content: currentNote.note.body,

    onUpdate: () => {
      bodyEdited(editor.getJSON())
    },
  })

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

  return (
    <div className='w-full'>
      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 150, hideOnClick: false }}
          className='w-80 rounded bg-white p-1 text-sm shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px]'
        >
          <span className='mb-2 mt-3 block px-2'>Styles</span>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`${editor.isActive('paragraph') ? 'is-active' : ''} flex h-14 min-h-[45px] w-full items-center gap-3 rounded px-2 py-1 hover:bg-gray-100`}
          >
            <div className='h-11 w-11 rounded border border-solid border-gray-200 p-2'>
              <FontAwesomeIcon icon={faParagraph} className='h-full w-full' />
            </div>
            <div className='text-left'>
              <span className='mb-1 block'>Paragraph</span>
              <span className='block'>Write some text</span>
            </div>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`${editor.isActive('taskList') ? 'is-active' : ''} flex h-14 min-h-[45px] w-full items-center gap-3 rounded px-2 py-1 hover:bg-gray-100`}
          >
            <div className='h-11 w-11 rounded border border-solid border-gray-200 p-2'>
              <FontAwesomeIcon icon={faListCheck} className='h-full w-full' />
            </div>
            <div className='text-left'>
              <span className='mb-1 block'>To-do list</span>
              <span className='block'>Write some tasks</span>
            </div>
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setHeading({ level: 2 }).run()
            }
            className={`${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} flex h-14 min-h-[45px] w-full items-center gap-3 rounded px-2 py-1 hover:bg-gray-100`}
          >
            <div className='h-11 w-11 rounded border border-solid border-gray-200 p-2'>
              <FontAwesomeIcon icon={faHeading} className='h-full w-full' />
            </div>
            <div className='text-left'>
              <span className='mb-1 block'>Heading 1</span>
              <span className='block'>Write some headers</span>
            </div>
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setHeading({ level: 3 }).run()
            }
            className={`${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} flex h-14 min-h-[45px] w-full items-center gap-3 rounded px-2 py-1 hover:bg-gray-100`}
          >
            <div className='h-11 w-11 rounded border border-solid border-gray-200 p-2'>
              <FontAwesomeIcon icon={faHeading} className='h-full w-full' />
            </div>
            <div className='text-left'>
              <span className='mb-1 block'>Heading 2</span>
              <span className='block'>Write some headers</span>
            </div>
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setHeading({ level: 4 }).run()
            }
            className={`${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''} flex h-14 min-h-[45px] w-full items-center gap-3 rounded px-2 py-1 hover:bg-gray-100`}
          >
            <div className='h-11 w-11 rounded border border-solid border-gray-200 p-2'>
              <FontAwesomeIcon icon={faHeading} className='h-full w-full' />
            </div>
            <div className='text-left'>
              <span className='mb-1 block'>Heading 3</span>
              <span className='block'>Write some headers</span>
            </div>
          </button>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

export default EditorBody
