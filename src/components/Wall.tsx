import { useEffect, useState } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import { NoteType } from "../types/note";
import { BsPlusCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";

type Props = Record<string, never>;

export default function Wall({ }: Props) {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [toggleForm, setToggleForm] = useState<boolean>(false);

    const handleAddNote = (note: NoteType) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    const handleCloseForm = () => {
        setToggleForm(false);
    }

    const handleUpdateNote = (updatedNote: NoteType) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
            )
        );
    };

    const handleDeleteNote = (deleteNote: NoteType) => {
        setNotes((prevNotes) => prevNotes.filter((prevNote) => prevNote.id !== deleteNote.id)
        )
    }

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

    return (
        <div>
            <button
                className="text-purple-600 hover:text-purple-700 text-[25px] rounded mb-4 cursor-pointer"
                onClick={() => setToggleForm(!toggleForm)}
            >
                {toggleForm ? <BsXCircleFill /> : <BsPlusCircleFill />}
            </button>

            {toggleForm && <AddNote onAddNote={handleAddNote} onCloseForm={handleCloseForm} />}

            <div className="grid grid-cols-1 gap-4">
                {notes.map((note) => (
                    <Note key={note.id} note={note} onUpdateNote={handleUpdateNote} onDeleteNote={handleDeleteNote} />
                ))}
            </div>
        </div>
    );
}
