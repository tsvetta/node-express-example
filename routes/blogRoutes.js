import express from 'express';
import blogController from '../controllers/blogController.js';

const router = express.Router();

export default router
    .get('/', blogController.blog_index)
    .post('/', blogController.blog_create_post)
    .get('/create', blogController.blog_create_get)
    .get('/:id', blogController.blog_details)
    .delete('/:id', blogController.blog_delete)