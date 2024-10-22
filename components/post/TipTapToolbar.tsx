import { ArrowUUpLeft, ArrowUUpRight, TextB, TextH, TextItalic, TextStrikethrough, TextUnderline } from '@phosphor-icons/react';
import { type Editor } from "@tiptap/react";

type Props = {
    editor: Editor | null;
};

const TipTapToolbar = ({ editor }: Props) => {
    if (!editor) {
        return null;
    }

    return (
        <div
            className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
      gap-5 w-full flex-wrap border border-gray-700"
        >
            <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={
                        editor.isActive("bold")
                            ? "bg-gray-700 text-white p-2 rounded-lg"
                            : "text-gray-400"
                    }
                >
                    <TextB className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={
                        editor.isActive("italic")
                            ? "bg-gray-700 text-white p-2 rounded-lg"
                            : "text-gray-400"
                    }
                >
                    <TextItalic className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleUnderline().run();
                    }}
                    className={
                        editor.isActive("underline")
                            ? "bg-gray-700 text-white p-2 rounded-lg"
                            : "text-gray-400"
                    }
                >
                    <TextUnderline className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    }}
                    className={
                        editor.isActive("strike")
                            ? "bg-gray-700 text-white p-2 rounded-lg"
                            : "text-gray-400"
                    }
                >
                    <TextStrikethrough className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? "bg-gray-700 text-white p-2 rounded-lg"
                            : "text-gray-400"
                    }
                >
                    <TextH className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                    }}
                    className={
                        editor.isActive("undo")
                            ? "bg-gray-700 text-white p-2 rounded-lg"
                            : "text-gray-400 hover:bg-gray-700 hover:text-white p-1 hover:rounded-lg"
                    }
                >
                    <ArrowUUpLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                    }}
                    className={
                        editor.isActive("redo")
                            ? "bg-gray-700 text-white p-2 rounded-lg"
                            : "text-gray-400 hover:bg-gray-700 hover:text-white p-1 hover:rounded-lg"
                    }
                >
                    <ArrowUUpRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default TipTapToolbar;