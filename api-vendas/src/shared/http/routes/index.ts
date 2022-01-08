import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ 200: 'OK' });
});

export default routes;
