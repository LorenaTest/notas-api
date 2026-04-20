import NoteModel from "./note.mysql.model.js";

export default class NoteMySQLRepository {
    async save(noteEntity) {
        const note = await NoteModel.create({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userid
        });
        return note.toJSON();
    }
    async findByUserId(userId) {
        return await NoteModel.findAll({ where: { userId } });
    }

    async delete(userId) {
        return await NoteModel.destroy({ where: { userId } });
    }   
    
    async update(userId, data) {
        const [updated] = await NoteModel.update(data, { where: { userId } });      
        if (updated) {
            return await NoteModel.findOne({ where: { userId } });
        }   
        throw new Error("Note not found");
    }   
}