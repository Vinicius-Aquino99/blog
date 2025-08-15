import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import { deletePost, createPost, listPosts, updatePost, getPostById} from '../controller/postsController.js'


const router = express.Router()

//create
router.post('/', protect, createPost)
//update
router.put('/:id', protect, updatePost)
//delete
router.delete('/:id', protect, deletePost )
//read
router.get('/', listPosts)
//open
router.get('/:id', getPostById);

export default router