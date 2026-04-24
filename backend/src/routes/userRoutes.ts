import express,{Router} from 'express'
import { login, register } from '../controller/userController'
import { addreview } from '../controller/Websitebuildcontroller'

const router:Router = express.Router()


router.post('/register',register)
router.post('/login',login)


export default router