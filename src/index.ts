import 'dotenv/config';
import 'express-async-errors'
import App from './app';
import CreateUser from './routes/Users/createUser';
import CreateProduct from './routes/Products/createProduct';
import EditProduct from './routes/Products/editProduct';
import DeleteProduct from './routes/Products/deleteProduct';
new App([new CreateUser(),new CreateProduct(),new EditProduct(),new DeleteProduct()],Number(process.env.PORT))