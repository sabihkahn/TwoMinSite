import express, { Router } from 'express'
import { Authorization } from '../middleware/Authorization'
import { addProduct, CreateWebsite, getwebsite } from '../controller/Websitebuildcontroller'


const router: Router = express.Router()


router.post('/createWebsite',Authorization,CreateWebsite)
router.get('/mywebsite/:webname',getwebsite)
router.post('/createproduct',Authorization,addProduct)


export default router