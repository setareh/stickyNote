import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { NoteType } from "../types/note";

type Props = {
  onAddNote: (note: NoteType) => void;
  onCloseForm: () => void;
};

export default function AddNote({ onAddNote, onCloseForm }: Props) {
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addNoteHandler = () => {
    if (!description || !deadline) {
      alert("Please fill in both fields.");
      return;
    }
    const newNote = {
      id: uuidv4(),
      description: description,
      createdAt: new Date(),
      deadline: new Date(deadline),
    };
    onAddNote(newNote);
    setDescription("");
    setDeadline("");
    onCloseForm();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 mb-4 w-56 bg-purple-200 p-4 rounded">
      <textarea
        className="border-0 px-2 py-1 h- rounded focus-visible:outline-0"
        placeholder="Enter note..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ref={textareaRef}
      />
      <input
        type="date"
        className="border-0 focus-visible:outline-0 px-2 py-1 rounded"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded"
        onClick={addNoteHandler}
      >
        Add
      </button>
    </div>
  );
}
