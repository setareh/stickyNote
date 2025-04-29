import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { NoteType } from "../types/note";

type Props = {
  onAddNote: (note: NoteType) => void;
  onCloseForm: () => void;
  toggleForm: boolean;
};

export default function AddNote({ onAddNote, onCloseForm, toggleForm }: Props) {
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const today = new Date().toISOString().split("T")[0];

  const addNoteHandler = () => {
    if (!description || !deadline) {
      setIsError(true);
      return;
    }
    const newNote: NoteType = {
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

  useEffect(() => {
    setDeadline('');
    setIsError(false);
    setDescription('');

  }, [toggleForm])

  return (
    <div className={`flex flex-col  w-56 bg-purple-200 rounded ms-2 transform  transition-all  duration-300 ease-in-out ${toggleForm ? 'max-h-[500px] opacity-100 scale-100 overflow-visible gap-2 mb-4 p-4' : 'max-h-0 opacity-0 scale-90 overflow-hidden gap-0 mb-0 p-0 pointer-events-none'
      }`}>
      <textarea
        className="border-0 px-2 py-1 h- rounded focus-visible:outline-0"
        placeholder="Enter note..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ref={textareaRef}
        required
      />
      <input
        type="date"
        className="border-0 focus-visible:outline-0 px-2 py-1 rounded"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
        min={today}
      />
      {isError && <p className="text-red-600 text-sm">Please fill in both fields.</p>}
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded cursor-pointer"
        onClick={addNoteHandler}
      >
        Add
      </button>
    </div>
  );
}
