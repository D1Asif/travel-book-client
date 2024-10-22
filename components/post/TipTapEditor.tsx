'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapToolbar from './TipTapToolbar'
import Underline from '@tiptap/extension-underline'

const TipTapEditor = ({ onChange }: any) => {
    const handleChange = (newContent: string) => {
        onChange(newContent)
    }

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        editorProps: {
            attributes: {
                class:
                    "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
            }
        },
        onUpdate: ({ editor }) => {
            handleChange(editor.getHTML())
        }
    })

    return (
        <div className="w-full px-4">
            <TipTapToolbar editor={editor} />
            <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        </div>
    )
}

export default TipTapEditor;
