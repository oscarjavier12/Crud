import { Hono } from 'hono';
import { FilmController } from '../controllers/film.controller.ts';
import {number} from "zod";

const filmRouter = new Hono();

filmRouter.get('/films', async (): Promise<Response> => {
    const { status, body } = await FilmController.getAll();
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });

});
filmRouter.get('/films/agregar', async (): Promise<Response> => {
    const { status, body } = await FilmController.add({"title": "Inception", "description": "A mind-bending thriller", "release_year": "2010", "language_id": 1});
    await FilmController.add({"title": "The Matrix", "description": "A sci-fi classic", "release_year": "1999", "language_id": 1});
    await FilmController.add({"title": "Interstellar", "description": "A space exploration epic", "release_year": "2014", "language_id": 1});

    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});
filmRouter.get('/films/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await FilmController.getById(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});
filmRouter.get('/films/eliminar/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await FilmController.delete(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

filmRouter.get('/films/actualizar/:id/:title/:description/:release_year/:language_id', async (c) => {
    const id = Number(c.req.param('id'));
    const title = c.req.param('title');
    const description = c.req.param('description');
    const release_year = c.req.param('release_year');
    const language_id = Number(c.req.param('language_id'));
    const { status, body } = await FilmController.update(id, { title, description, release_year, language_id});
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});
export default filmRouter;
