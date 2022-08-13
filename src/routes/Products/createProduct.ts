import {Router} from 'express'
import __Router from "utils/routerInterface";
import {body} from 'express-validator'
import ProductController from '../../controllers/productsControllers';
import {validatereq} from '../../middlewares/validateReq'
import {logedin} from '../../middlewares/checklogedin'
class CreateProduct implements __Router{
    path='/products/create_product'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            logedin,
            [
                body('title').isLength({min:2,max:255}).withMessage('title must be at least 2 chars long and 255 max'),
                body('price').isDecimal().withMessage('Price must be valid'),
                body('image_url').not().isEmpty().withMessage('You must provide image url for the product.')
            ],
            validatereq,
            ProductController.create_product
        );
    }
}

export default CreateProduct;