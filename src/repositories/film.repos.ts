import { db } from '../db/connection.ts';
import { films } from '../db/schema.ts';
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const FilmRepository = {
    findAll: async () => db.select().from(films),
    findById: async (id: number) => {
        const [actor] = await db
            .select()
            .from(films)
            .where(eq(films.film_id, id));
        return actor;
    },
    add: async (data: { title: string; description: string; release_year:string; language_id:number }) =>
        db.insert(films).values(data).returning(),
    update: async (id: number, data: {title?: string; description?: string; release_year?:string; language_id?:number }) =>
        db.update(films)
            .set(data)
            .where(eq(films.film_id, id))
            .returning(),
    delete: async (id: number) =>
        db.delete(films)
            .where(eq(films.film_id, id))
            .returning()
    ,
};
