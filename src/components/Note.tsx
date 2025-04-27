import { useState } from "react";
import { NoteType } from "../types/note";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { BsArrowsMove } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import { BsCalendar2Event } from "react-icons/bs";
import { BsCalendar4Range } from "react-icons/bs";
import { BsCalendar2X } from "react-icons/bs";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    note: NoteType;
    onUpdateNote: (updatedNote: NoteType) => void;
    onDeleteNote: (deleteNote: NoteType) => void
}

export default function Note({ note, onUpdateNote, onDeleteNote }: Props) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [description, setDescription] = useState<string>(note.description);
    const [deadline, setDeadline] = useState<string>(note.deadline.toISOString().split("T")[0]);

    const isDeadlineReached = new Date(note.deadline) <= new Date();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: note.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        margin: "10px",
        zIndex: isDragging ? "100" : "auto",
        opacity: isDragging ? 0.3 : 1
    };

    const handleSaveNote = () => {
        const updatedNote = {
            ...note,
            description: description,
            deadline: new Date(deadline),
        };
        onUpdateNote(updatedNote);
        setIsEditMode(false);
    };

    const handleCancel = () => {
        setDescription(note.description);
        setDeadline(note.deadline.toISOString().split("T")[0]);
        setIsEditMode(false);
    }

    const handleDeleteNote = () => {
        onDeleteNote(note);
    }

    return (
        <div ref={setNodeRef} style={style} className={`w-56  rounded  ${isDeadlineReached ? "bg-red-200" : " bg-purple-200"}`}>
            <div className={`flex justify-between items-center px-4 py-2 rounded rounded-b-none ${isDeadlineReached ? "bg-red-100" : " bg-purple-100"}`}>
                <button {...listeners} {...attributes} >
                    <BsArrowsMove className="text-purple-600 hover:text-purple-700 text-[20px]" />
                </button>
                <div>
                    {
                        isEditMode
                            ? <button
                                className="p-1 me-1 text-blue-600 hover:text-blue-700 text-[20px] rounded cursor-pointer"
                                onClick={handleCancel}
                            >
                                <BsXCircle />
                            </button>
                            : <button
                                className={` p-1 me-1 text-blue-600 hover:text-blue-700 text-[20px] rounded cursor-pointer`}
                                onClick={() => setIsEditMode(true)}
                            >
                                <BsPencilSquare />
                            </button>
                    }

                    <button
                        className={` p-1 me-1 text-red-600 hover:text-red-700 text-[20px] rounded cursor-pointer`}
                        onClick={handleDeleteNote}
                    >
                        <BsTrash3 />
                    </button>
                </div>
            </div>
            {
                isEditMode
                    ? <div className="p-4 pb-0 flex flex-col gap-2">
                        <textarea
                            className="border-0 py-1 h-32 pe-1 rounded focus-visible:outline-0"
                            placeholder="Enter note..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="date"
                            className="border-0 py-1 rounded focus-visible:outline-0"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                        <div className="flex justify-between">
                            <button
                                className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-1 rounded cursor-pointer"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded cursor-pointer"
                                onClick={handleSaveNote}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                    : <div
                        className={`p-4 h-40 overflow-auto `}
                    >
                        <p className="P-2">{note.description}</p>


                    </div>
            }
            <div className={`flex flex-col justify-between px-4 pt-2 py-4 `}>
                <hr className={`my-2 ${isDeadlineReached ? " border-red-100" : " border-purple-100"}`} />
                <div className="flex justify-between items-center P-2">
                    <div className="flex items-center text-sm text-gray-700">
                        <BsCalendar2Event className="me-1" />
                        <span>
                            {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <div className={`flex items-center text-sm  P-2 ${isDeadlineReached ? 'text-red-700' : 'text-gray-800'}`}>
                    {
                        isDeadlineReached
                            ? <BsCalendar2X className="me-1" />
                            : <BsCalendar4Range className="me-1" />
                    }
                    {new Date(note.deadline).toLocaleDateString()}
                </div>
            </div>
        </div>

    );
}
