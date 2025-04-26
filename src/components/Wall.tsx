import { useEffect, useRef, useState } from "react";
import Note from "./Note";
import { NoteType } from "../types/note";
import { v4 as uuidv4 } from "uuid";
import { BsPlusCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";

type Props = Record<string, never>;

export default function Wall({ }: Props) {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");

    const [toggleForm, setToggleForm] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const addNote = () => {
        if (!description || !deadline) {
            alert("Please fill in both fields.");
            return;
        }
        setNotes([
            ...notes,
            {
                id: uuidv4(),
                description: description,
                createdAt: new Date(),
                deadline: new Date(deadline),
            },
        ]);
        setDescription("");
        setDeadline("");
        setToggleForm(false)
    };

    useEffect(() => {
        const storedNotes = localStorage.getItem("stickyNotes");
        if (storedNotes) {
            setNotes(JSON.parse(storedNotes).map((note: any) => ({
                ...note,
                createdAt: new Date(note.createdAt),
                deadline: new Date(note.deadline),
            })));
        }
    }, []);

    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem("stickyNotes", JSON.stringify(notes));
        }
    }, [notes]);

    useEffect(() => {
        if (toggleForm && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [toggleForm]);

    return (
        <div>
            <button
                className="text-purple-600 hover:text-purple-700 text-[25px] rounded mb-4"
                onClick={() => setToggleForm(!toggleForm)}
            >
                {
                    toggleForm
                        ? <BsXCircleFill />
                        : <BsPlusCircleFill />
                }

            </button>
            {
                toggleForm &&
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
                        onClick={addNote}
                    >
                        Add
                    </button>
                </div>
            }

            <div className="grid grid-cols-1 gap-4">
                {notes.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
        </div>
    );
}
