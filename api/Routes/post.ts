import express from "express";
import { postController } from "../Controllers/postController";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: posts
 *     description: API for posts management
 */

/**
 * @swagger
 * /api/posts/:
 *   get:
 *     summary: Get all posts
 *     tags: [posts]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", postController.getAll);

/**
 * @swagger
 * /api/posts/{_id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/:_id", postController.getById);

/**
 * @swagger
 * /api/posts/:
 *   post:
 *     summary: Create a new post
 *     tags: [posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               author:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *                 default: true
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post("/", postController.create);

/**
 * @swagger
 * /api/posts/{_id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               author:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *                 default: true
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Not found
 */
router.put("/:_id", postController.update);

/**
 * @swagger
 * /api/posts/{_id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.delete("/:_id", postController.remove);

export default router;
