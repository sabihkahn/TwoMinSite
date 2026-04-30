import express, { Router } from 'express'
import {  Dashboardallweb, getWebsiteanalytics, searchWebsite } from '../controller/DashboardController'
import { Authorization } from '../middleware/Authorization'

 
const router: Router = express.Router()

router.get('/dashboard',Authorization,Dashboardallweb)
router.post('/websiteanalytics',Authorization,getWebsiteanalytics)
router.post('/searchweb',Authorization,searchWebsite)

export default router