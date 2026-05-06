export default class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    
    createCategory = async (req, res) => {
        try {
            const data = req.body;
            data.userId = req.user.id; 
            const category = await this.categoryService.createCategory(data);
            res.status(201).json(category); // 201 Created
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
 
    getCategoriesByUserId = async (req, res) => {
        try {
            const userId = req.user.id; 
            const categories = await this.categoryService.getCategoriesByUserId(userId);
            res.status(200).json(categories); // 200 OK
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const category = await this.categoryService.updateCategory(id, data);
            res.status(200).json(category); // 200 OK
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            await this.categoryService.deleteCategory(id);
            res.status(200).json({ message: "Categoría eliminada exitosamente" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}