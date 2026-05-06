import CategoryService from "../../application/uses-cases/category.service.js";
import {jest} from '@jest/globals';

const mockCategoryRepository = { 
    save: jest.fn(), 
    findByUserId: jest.fn(),
};

describe('CategoryService - Pruebas Unitarias', () => {
    let categoryService;

    beforeEach(() => {
        jest.clearAllMocks();
        categoryService = new CategoryService(mockCategoryRepository);
    });

    test('Crear: debería crear y guardar una categoría correctamente', async () => {
        const data = { name: 'Mi categoría', description: 'Descripción', userId: 'user_123' };
        mockCategoryRepository.save.mockResolvedValue({ id: 1, ...data });
    
        const result = await categoryService.createCategory(data);
    
        expect(mockCategoryRepository.save).toHaveBeenCalledTimes(1);
        expect(result.name).toBe('Mi categoría');
    });

    test('Crear: debería fallar al crear una categoría sin nombre', async () => {
        const data = { description: 'Sin nombre' };
        await expect(categoryService.createCategory(data)).rejects.toThrow("Name is required");
    });

    test('Leer: debería devolver las categorías de un usuario específico', async () => {
        const mockCategories = [{ name: 'Categoría 1' }, { name: 'Categoría 2' }];
        mockCategoryRepository.findByUserId.mockResolvedValue(mockCategories);
        
        const result = await categoryService.getCategoriesByUserId('user_123');
        
        expect(mockCategoryRepository.findByUserId).toHaveBeenCalledTimes(1);
        expect(result).toBe(mockCategories);
    });
});