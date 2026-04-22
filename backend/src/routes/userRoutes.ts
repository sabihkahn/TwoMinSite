import express,{Router} from 'express'
import { register } from '../controller/userController'

const router:Router = express.Router()



router.get('/register',register)


export default router