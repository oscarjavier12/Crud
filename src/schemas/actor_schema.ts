import { z } from 'zod';

export const actorSchema = z.object({
    first_name: z.string().min(1, "El nombre es obligatorio"),
    last_name: z.string().min(1, "El apellido es obligatorio"),
});