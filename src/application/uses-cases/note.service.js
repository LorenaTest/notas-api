// importante al trabajar con nuestros archivos, debemos anadir al final .js requerido para ESM.
import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService {
    constructor(noteRepository, mailService){
        this.noteRepository = noteRepository;
        this.mailService = mailService; 
    }

    async createNote(data) {
        if (!data.title) {
            throw new Error("El título es obligatorio");
        }

        if (!data.content) {
            throw new Error("El contenido es obligatorio");
        }

        const note = new NoteEntity(data);
        return await this.noteRepository.save(note);
    }

    async getNotesByUserId(userId){
        return await this.noteRepository.findByUserId(userId);
    }

    async deleteNote(userId){
        const note = await this.noteRepository.findByUserId(userId);    
        if (!note) {
            throw new Error("Note not found");
        }   if (note.userId !== userId) {     
            throw new Error("Unauthorized");
        }
        await this.noteRepository.delete(userId);
        return { message: "Note deleted successfully" };
    }  

    async updateNote(userId, data) {
        const note = await this.noteRepository.findByUserId(userId);
        if (!note) {
            throw new Error("Note not found");
        }
        if (note.userId !== userId) {
            throw new Error("Unauthorized");
        }

        await this.noteRepository.update(userId, data);
        return { message: "Note updated successfully" };
    }

    async shareNoteByEmail(noteId, targetEmail, currentUserId) {
        const note = await this.noteRepository.findById(noteId);
        if (!note) throw new Error("Note not found");
        
        // RESTRICCIÓN: Solo el dueño puede compartirla
        if (note.userId !== currentUserId) {
            throw new Error("Unauthorized: You can only share your own notes");
        }

        return await this.mailService.sendNoteEmail(targetEmail, note);
    }

    async getPublicNoteById(noteId) {
        const note = await this.noteRepository.findById(noteId);
        if (!note) throw new Error("Note not found");
        if (note.isPrivate) throw new Error("Note is private");
        return note;
    }
}
