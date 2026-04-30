import express, { Router } from 'express'
import { Authorization } from '../middleware/Authorization'
import { addProduct, addreview, CreateWebsite, deleteproduct, deletewebsite, getproductorder, getproductsandorders, getwebsite, purchaseproduct, updateproduct, updateTheme, updatewebsite } from '../controller/Websitebuildcontroller'


const router: Router = express.Router()


router.post('/createWebsite',Authorization,CreateWebsite)
 
router.get('/mywebsite/:webname',getwebsite)

router.post('/createproduct',Authorization,addProduct)
 
router.post('/purchaseprodut',purchaseproduct)

router.post('/review',addreview)

router.delete('/deleteproduct/:shopname/:productid', Authorization, deleteproduct)

router.get("/getproductsandorders/:webname",Authorization,getproductsandorders)

router.get('/viewmyorder/:webname/:productid',Authorization,getproductorder)

// router.get("/getorders/:webname",Authorization,getproductsandorders)

router.put('/updateproduct/:shopid/:productid', Authorization, updateproduct)

router.delete('/deletewebsite/:webname',Authorization,deletewebsite)

router.put('/updatewebsite/:webname',Authorization,updatewebsite)

router.put('/updatetheme',Authorization,updateTheme)

export default router