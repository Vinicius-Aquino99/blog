import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import { createPost, listPosts, updatePost, getPostById} from '../controller/postsController.js'


const router = express.Router()

router.post('/', protect, createPost)
router.get('/', listPosts)
router.get('/:id', getPostById);
router.put('/:id', protect, updatePost)

export default router