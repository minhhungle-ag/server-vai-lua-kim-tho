import express from "express";
import { categoryController } from "../Controllers/category";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: categories
 *     description: API for category management
 */

/**
 * @swagger
 * /api/categories/:
 *   get:
 *     summary: Get all categories
 *     tags: [categories]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", categoryController.getAll);

/**
 * @swagger
 * /api/categories/:_id:
 *   get:
 *     summary: Get a category by ID
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", categoryController.getById);

/**
 * @swagger
 * /api/categories/:
 *   post:
 *     summary: Create a new category
 *     tags: [categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/", categoryController.create);

/**
 * @swagger
 * /api/categories/{_id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [categories]
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
 *               name:
 *                 type: string
 *               status:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       200:
 *         description: Success
 */
router.put("/:id", categoryController.update);

/**
 * @swagger
 * /api/categories/{_id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/:id", categoryController.remove);

export default router;
