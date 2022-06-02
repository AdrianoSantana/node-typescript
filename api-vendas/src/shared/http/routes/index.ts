import usersRoute from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use(usersRoute);
routes.get('/', (request, response) => {
  response.json({ 200: 'OK' });
});

export default routes;
