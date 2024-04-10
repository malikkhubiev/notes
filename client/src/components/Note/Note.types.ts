import { DeleteNoteType, GetNoteType } from "../../store/state.types";
import { NoteType } from "../../types/main.types";

export interface NotePropsType extends NoteType {
    deleteNote: DeleteNoteType
    onSendNote: (id: number) => any
}