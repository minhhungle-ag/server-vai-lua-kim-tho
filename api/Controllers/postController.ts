import db from "../Models/post";
import { Request, Response } from "express";

export const postController = {
  getAll(req: Request, res: Response) {
    const { page = 1, limit, search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { shortDescription: { $regex: search, $options: "i" } },
          { Description: { $regex: search, $options: "i" } },
        ],
      };
    }

    db.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec()
      .then(async (data) => {
        const total = await db.countDocuments(query);
        const totalPage = Math.ceil(total / Number(limit));

        res.status(200).json({
          success: true,
          data: data,
          meta: {
            total,
            totalPages: totalPage,
            page: Number(page),
            limit: Number(limit),
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  },

  getById(req: Request, res: Response) {
    const { _id } = req.params;
    db.findById(_id)
      .then((data) => {
        res.status(200).json({
          success: true,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  },

  create(req: Request, res: Response) {
    const { body } = req;
    const newPost = new db(body);
    newPost
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
          data: newPost,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  },

  update(req: Request, res: Response) {
    const { _id } = req.params;
    const { body } = req;
    db.findByIdAndUpdate(_id, body, { new: true })
      .then((data) => {
        res.status(200).json({
          success: true,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  },

  remove(req: Request, res: Response) {
    const { _id } = req.params;
    db.findByIdAndDelete(_id)
      .then((data) => {
        res.status(200).json({
          success: true,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  },
};
