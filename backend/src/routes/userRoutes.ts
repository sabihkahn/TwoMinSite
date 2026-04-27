import express,{Router} from 'express'
import { login, profile, register, updateprofile } from '../controller/userController'
import { Authorization } from '../middleware/Authorization'

const router:Router = express.Router()


router.post('/register',register)
router.post('/login',login)
router.get('/profile',Authorization,profile)
router.put('/updateprofile',Authorization,updateprofile)
router.get('/dashboard',Authorization)


export default router