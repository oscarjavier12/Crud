import { Hono } from 'hono';
import { actorSchema } from '../schemas/actor_schema.ts';
import { ActorController } from '../controllers/actor.controller.ts';
import { validateBody } from '../middlewares/validate.ts'; // este es el nuevo middleware

const actorRouter = new Hono();

actorRouter.get('/actors', async (): Promise<Response> => {
    const { status, body } = await ActorController.getAll();
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });

});

actorRouter.get('/actors/agregar', async (): Promise<Response> => {
    const { status, body } = await ActorController.add({"first_name": "Constantine", "last_name": "Constantine"});
    await ActorController.add({"first_name": "Leon", "last_name": "Castro"});
    await ActorController.add({"first_name": "Leon S.", "last_name": "Kennedy"});

    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });

});

actorRouter.get('/actors/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await ActorController.getById(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

actorRouter.get('/actors/eliminar/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await ActorController.delete(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});
actorRouter.get('/actors/actualizar/:id/:first_name/:last_name', async (c) => {
    const id = Number(c.req.param('id'));
    const first_name = c.req.param('first_name');
    const last_name = c.req.param('last_name');
    const { status, body } = await ActorController.update(id, { first_name, last_name });
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});


actorRouter.post(
    '/actors',
    validateBody(actorSchema), // ✅ validación personalizada
    async (c) => {
        const bodyValidated = c.get('validatedBody'); // ya está validado
        const { status, body } = await ActorController.add(bodyValidated);
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);


export default actorRouter;
