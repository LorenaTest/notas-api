import NoteModel from "./note.model.js";

export default class NoteMongoRepository {
    async save(noteEntity) {
        const note = new NoteModel({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userid
        });
        const savedNote = await note.save();
        return savedNote.toObject();
    }

    async findByUserId(userId) {
        return await NoteModel.find({ userId});
    }

    async delete(userId) {
        return await NoteModel.deleteOne({ userId });
    }   
    
    async update(userId, data) {
        return await NoteModel.findOneAndUpdate({ userId }, data, { new: true });
    }       
}