import express,{Router} from 'express'
import { checkController, login, profile, register, updateprofile } from '../controller/userController'
import { Authorization } from '../middleware/Authorization'

const router:Router = express.Router()


router.post('/register',register)
router.post('/login',login)
router.get('/profile',Authorization,profile)
router.put('/updateprofile',Authorization,updateprofile)
router.get('/check',Authorization,checkController)


export default router