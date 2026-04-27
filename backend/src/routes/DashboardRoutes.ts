import express, { Router } from 'express'
import {  Dashboardallweb, getWebsiteanalytics } from '../controller/DashboardController'
import { Authorization } from '../middleware/Authorization'


const router: Router = express.Router()

router.get('/dashboard',Authorization,Dashboardallweb)
router.get('/websiteanalytics',Authorization,getWebsiteanalytics)

export default router