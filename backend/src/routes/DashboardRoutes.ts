import express, { Router } from 'express'
import {  Dashboardallweb } from '../controller/DashboardController'
import { Authorization } from '../middleware/Authorization'


const router: Router = express.Router()

router.get('/dashboard',Authorization,Dashboardallweb)


export default router