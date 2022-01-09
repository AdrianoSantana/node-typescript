import Express, { NextFunction, Request, Response } from "express";
import Cors from "cors";
import routes from './routes';
import AppError from "@shared/errors/AppError";
import STATUSCODE from "@shared/status_code";

const app = Express();

app.use(Cors());
app.use(Express.json());
app.use(routes);
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof(AppError))
    {
      return response.status(error.statusCode).json(
        {
          'status': 'error',
          'message': error.message
        }
      );
    }
    return response.status(STATUSCODE.INTERNAL_SERVER_ERROR).json(
      {
        'status': 'error',
        'message': 'Internal Server Error'
      }
    )
})

app.listen(3333, () => console.log('running on port 3333'));
