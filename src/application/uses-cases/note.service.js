// importante al trabajar con nuestros archivos debemos
import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService {
    constructor(noteRepository){
        this.noteRepository = noteRepository;
    }

    async createNote(data) {
        if (!data.title || ! data.content){
            throw new Error("Title and content are required");
        }

        const note = new NoteEntity(data);
        return await this.noteRepository.save(note);
    }

    async getNoteByUser(userId){
        return await this.noteRepository.findByUserId(userId);
    }

    async deleteNote(userId){
        const note = await this.noteRepository.findByUserId(userId);    
        if (!note) {
            throw new Error("Note not found");
        }   if (note.userId !== userId) {     
            throw new Error("Unauthorized");
        }
        return await this.noteRepository.delete(userId);
    }  

    async updateNote(userId, data) {
        const note = await this.noteRepository.findByUserId(userId);
        if (!note) {
            throw new Error("Note not found");
        }
        if (note.userId !== userId) {
            throw new Error("Unauthorized");
        }
        return await this.noteRepository.update(userId, data);
    }
}
