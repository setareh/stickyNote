import { useEffect, useState } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import { NoteType } from "../types/note";
import { BsPlusCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable";

type Props = Record<string, never>;

export default function Wall({ }: Props) {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [toggleForm, setToggleForm] = useState<boolean>(false);

    const handleAddNote = (note: NoteType): void => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    const handleCloseForm = (): void => {
        setToggleForm(false);
    }

    const handleUpdateNote = (updatedNote: NoteType): void => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
            )
        );
    };

    const handleDeleteNote = (deleteNote: NoteType): void => {
        setNotes((prevNotes) => prevNotes.filter((prevNote) => prevNote.id !== deleteNote.id)
        )
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            setNotes((prevNotes) => {
                const oldIndex = prevNotes.findIndex((note) => note.id === active.id);
                const newIndex = prevNotes.findIndex((note) => note.id === over.id);

                return arrayMove(prevNotes, oldIndex, newIndex);
            });
        }
    };

    useEffect(() => {
        const storedNotes = localStorage.getItem("stickyNotes");
        if (storedNotes) {
            setNotes(JSON.parse(storedNotes).map((note: NoteType) => ({
                ...note,
                createdAt: new Date(note.createdAt),
                deadline: new Date(note.deadline),
            })));
        }
    }, []);

    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem("stickyNotes", JSON.stringify(notes));
        } else {
            localStorage.removeItem("stickyNotes");
        }
    }, [notes]);

    return (
        <div>
            <button
                className="text-purple-600 hover:text-purple-700 text-[25px] rounded mb-4 cursor-pointer ms-2"
                onClick={() => setToggleForm(!toggleForm)}
            >
                {toggleForm ? <BsXCircleFill /> : <BsPlusCircleFill />}
            </button>

            <AddNote toggleForm={toggleForm} onAddNote={handleAddNote} onCloseForm={handleCloseForm} />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="flex flex-wrap justify-center md:justify-start">
                    <SortableContext items={notes} strategy={rectSortingStrategy}>
                        {notes.map((note) => (
                            <Note key={note.id} note={note} onUpdateNote={handleUpdateNote} onDeleteNote={handleDeleteNote} />
                        ))}
                    </SortableContext>
                </div>
            </DndContext>
        </div>
    );
}
