'use client'

import React, { ReactElement, useEffect } from 'react'
import { Editor } from '@tiptap/react'
import { Bold, Italic, HighlighterIcon, Sparkle } from 'lucide-react' 
import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { chatSession } from '@/config/AiModel';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';

interface EditorExtProps {
  editor: Editor | null;
}

export default function EditorExt({ editor }: EditorExtProps): ReactElement | null {
  const { fileId } = useParams();
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId as string
  });

  const searchAction = useAction(api.myAction.search);

  useEffect(() => {
    if (editor && notes) {
      editor.commands.setContent(notes);
    }
  }, [editor, notes]);


  if (!editor) return null;

  const onAiClick = async () => {
    toast("Getting Your Answer..");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );

    const result = await searchAction({
      query: selectedText,
      fileId: fileId as string
    });

    const unFormattedAns = JSON.parse(result);
    let AllFormatedAns = '';
    unFormattedAns?.forEach((item: { pageContent: string }) => {
      AllFormatedAns += item.pageContent;
    });

    const PROMPT = `For question ${selectedText} and with the given content as answer, please give appropriate answer in HTML format. The answer content is ${AllFormatedAns}`;
    const AiModelResult = await chatSession.sendMessage(PROMPT);
    const finalAns = AiModelResult.response.text().replace('```html', '').replace('```', '');

    const AllText = editor.getHTML();
    editor.commands.setContent(AllText + '<p><strong>Answer</strong>' + finalAns + '</p>');

    saveNotes({
      notes: editor.getHTML(),
      createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown",
      fileId: fileId as string
    });
  };

  return (
    <div>
      <div className="control-group">
        <div className="button-group flex gap-4 p-4">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-yellow-500' : ''}
            title="Bold"
          >
            <Bold />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-yellow-500' : ''}
            title="Italic"
          >
            <Italic />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'text-yellow-500' : ''}
            title="Highlight"
          >
            <HighlighterIcon />
          </button>

          <button
            onClick={() => onAiClick()}
            className='text-yellow-500 hover:text-blue-600'
            title="Ask AI"
          >
            <Sparkle />
          </button>
        </div>
      </div>
    </div>
  );
}
