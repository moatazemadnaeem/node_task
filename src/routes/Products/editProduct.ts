import {Router} from 'express'
import __Router from "utils/routerInterface";
import ProductController from '../../controllers/productsControllers';
import {logedin} from '../../middlewares/checklogedin'
class EditProduct implements __Router{
    path='/products/edit_product'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.put(
            `${this.path}`,
            logedin,
            ProductController.edit_product
        );
    }
}

export default EditProduct;