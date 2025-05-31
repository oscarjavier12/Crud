import { Hono } from 'hono';
import actorRouter from './src/routes/actor.route';
import filmRouter from './src/routes/film.route';
import { errorHandler } from './src/middlewares/error_handler.ts';

const app = new Hono();

app.use('*', errorHandler); // Aplica a todas las rutas
app.route('/', actorRouter);
app.route('/', filmRouter);
export default app;
