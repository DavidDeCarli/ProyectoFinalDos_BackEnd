const { HTTP_STATUS } = require("../constants/api.constants");
const { ProductsDao } = require("../models/daos/app.daos");
const { successResponse } = require("../utils/api.utils");

const productsDao = new ProductsDao();

class ProductsController {
    
    async getProducts(req, res, next) {
        try {
            const users = await productsDao.getAll();
            const response = successResponse(users);
            return res.status(HTTP_STATUS.OK).json(response);
        }
        catch(error) {
            next(error);
        }
    }

    async getProductsById(req, res, next) {
        const { id } = req.params;

        try {
            const user = await productsDao.getById(id);
            const response = successResponse(user);
            return res.status(HTTP_STATUS.OK).json(response);
        }
        catch(error) {
            next(error);
        }
    }

    async saveProducts(req, res, next) {
        try {
            const newProduct = await productsDao.save(req.body);
            const response = successResponse(newProduct);
            return res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch(error) {
            next(error);
        }
    }

    async updateProducts(req, res, next) {
        const { id } = req.params;

        try {
            const updateProducts = await productsDao.update(id, req.body);
            const response = successResponse(updateProducts);
            return res.status(HTTP_STATUS.OK).json(response);
        }
        catch(error) {
            next(error);
        }
    }

    async deleteProducts(req, res, next) {
        const { id } = req.params;

        try {
            const deletedProduct = await productsDao.delete(id);
            const response = successResponse(deletedProduct);
            return res.status(HTTP_STATUS.OK).json(response);
        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = new ProductsController();