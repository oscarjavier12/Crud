import { db } from '../db/connection.ts';
import { actors } from '../db/schema.ts';
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const ActorRepository = {
    findAll: async () => db.select().from(actors),
    findById: async (id: number) => {
        const [actor] = await db
            .select()
            .from(actors)
            .where(eq(actors.actor_id, id));
        return actor;
    },
    add: async (data: { first_name: string; last_name: string }) =>
        db.insert(actors).values(data).returning(),
    update: async (id: number, data: { first_name?: string; last_name?: string }) =>
        db.update(actors)
            .set(data)
            .where(eq(actors.actor_id, id))
            .returning(),
    delete: async (id: number) =>
        db.delete(actors)
            .where(eq(actors.actor_id, id))
            .returning()
    ,
};
