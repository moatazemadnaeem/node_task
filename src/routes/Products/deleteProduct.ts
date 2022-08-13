import {Router} from 'express'
import __Router from "utils/routerInterface";
import ProductController from '../../controllers/productsControllers';
import {logedin} from '../../middlewares/checklogedin'
class DeleteProduct implements __Router{
    path='/products/delete_product'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.delete(
            `${this.path}`,
            logedin,
            ProductController.delete_product
        );
    }
}

export default DeleteProduct;