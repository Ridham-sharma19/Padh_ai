'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'

import EditorExt from './EditorExt'

export const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "start making notes here"
      }),
      Highlight 
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-screen'
      }
    },
    immediatelyRender: false 
  })

  if (!editor) {
    return null
  }

  return (
    <div>
      <div>
        <EditorExt editor={editor} /> 
        <div className='overflow-scroll h-[88vh]'>
           <EditorContent editor={editor}
         /></div>
       
      </div>
    </div>
  )
}

