import categoryModel from "./category.model.js";

export default class CategoryMongoRepository {
    async save(categoryEntity) {
        const category = new categoryModel({
            name: categoryEntity.name,
            description: categoryEntity.description,
            userId: categoryEntity.userId
        });
        const saveCategory = await category.save();
        return saveCategory.toObject();
    }

    async findByUserId(userId) {
        return await categoryModel.find({ userId });
    }

    async update(id, data) {
        return await categoryModel.findByIdAndUpdate(id, data, { new: true });

    }
}