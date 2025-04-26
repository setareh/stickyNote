import { NoteType } from "../types/note";

interface Props {
    note: NoteType;
}

export default function Note({ note }: Props) {
    const isDeadlineReached = new Date(note.deadline) <= new Date();

    return (
        <div className={`p-4 w-56  rounded  ${isDeadlineReached ? "bg-red-200" : " bg-purple-200"}`}>
            <div
                className={`h-44 overflow-auto `}
            >
                <div className="flex justify-between items-center mb-2 P-2">
                    <span className="text-sm text-gray-700">
                        {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <p className=" P-2">{note.description}</p>
                <p className={`text-sm text-gray-800 P-2 ${isDeadlineReached ? 'text-red-700' : ''}`}>Deadline: {new Date(note.deadline).toLocaleDateString()}</p>
            </div>
        </div>
    );
}
