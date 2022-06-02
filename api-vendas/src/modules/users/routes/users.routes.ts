import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from "../controllers/UsersController";


const usersRoute = Router()
const usersController = new UsersController()

usersRoute.get('/users', usersController.index)
usersRoute.post(
  '/users',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }
  }),
  usersController.create
)

export default usersRoute
