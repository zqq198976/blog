import express from 'express';
import { addUsers } from '../controllers/users.js';
const router = express.Router()
router.get('/users', addUsers)
export default router
