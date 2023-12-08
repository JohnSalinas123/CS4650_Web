import express from 'express';
import { getMessages } from '../controllers/getMessages.js'

const router = express.Router();

router.get('/', getMessages)

export default router;