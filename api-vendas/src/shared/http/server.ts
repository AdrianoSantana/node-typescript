import Express from "express";
import Cors from "cors";
import routes from './routes';

const app = Express();

app.use(Cors());
app.use(Express.json());
app.use(routes);

app.listen(3333, () => console.log('running on port 3333'));
