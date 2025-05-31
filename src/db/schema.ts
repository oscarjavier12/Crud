import { pgTable, serial,  varchar } from 'drizzle-orm/pg-core';

export const actors = pgTable('actor', {
    actor_id: serial('actor_id').primaryKey(),
    first_name: varchar('first_name', { length: 100 }),
    last_name: varchar('last_name', { length: 100 })
});
export const films = pgTable('film', {
    film_id: serial('film_id').primaryKey(),
    title: varchar('title', { length: 255 }),
    description: varchar('description', { length: 1000 }),
    release_year: varchar('release_year', { length: 4 }),
    language_id: serial('language_id'),
    rental_duration: serial('rental_duration'),
    rental_rate: varchar('rental_rate', { length: 10 }),
    length: serial('length'),
    replacement_cost: varchar('replacement_cost', { length: 10 }),
    rating: varchar('rating', { length: 10 }),
    last_update: varchar('last_update', { length: 20 }),
    special_features: varchar('special_features', { length: 255 }),
    fulltext: varchar('fulltext', { length: 255 })

})

