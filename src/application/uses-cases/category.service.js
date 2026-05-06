import CategoryEntity from "../../domain/entities/category.entity.js";
export default class CategoryService {
    constructor(categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    async createCategory(data){
        const name = data.name;
       
        if (!name) {
            throw new Error("Name is required");
        }
        const categoryEntity = new CategoryEntity({ data, name });
        return await this.categoryRepository.save(categoryEntity);
    }

    async getCategoriesByUserId(userId){
        return await this.categoryRepository.findByUserId(userId);
    }

    async updateCategory(id, data) {
        const category = await this.categoryRepository.findById(id);
        if (!category) throw new Error("Category not found");
          
        await this.categoryRepository.update(id, category);
        return { message: "Category updated successfully" };
    }

    async deleteCategory(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category) throw new Error("Category not found");

        await this.categoryRepository.delete(id);
        return { message: "Category deleted successfully" };
    }
}