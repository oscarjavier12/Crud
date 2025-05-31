import { FilmService } from '../services/film.service.ts';
import {HttpResponse} from "../utils/http_reponse.ts";


export const FilmController = {
    getAll: async () => {
        try {
            const films = await FilmService.getAll();
            return HttpResponse.ok(films, "Peliculas recuperados correctamente");
        } catch (error) {
            return HttpResponse.error("Error al recuperar las peliculas");
        }
    },

    getById: async (id: number) => {
        try {
            const film = await FilmService.getById(id);
            if (!film) {
                return HttpResponse.notFound("Pelicula no encontrado");
            }
            return HttpResponse.ok([film], "Pelicula encontrado");
        } catch (error) {
            return HttpResponse.error("Error al recuperar la Pelicula");
        }
    },

    add: async (body: { title: string; description: string; release_year:string; language_id:number}) => {
        try {
            const newFilm = await FilmService.add(body.title, body.description, body.release_year, body.language_id);
            return HttpResponse.created(newFilm, "pelicula creado");
        } catch (error) {
            console.error("Error detallado al crear la pelicula:", error); // <-- Agrega esta línea
            return HttpResponse.error("Error al crear la pelicula");
        }
    },
    delete: async (id: number) => {
        try {
            const deletedFilm = await FilmService.delete(id);
            if (!deletedFilm) {
                return HttpResponse.notFound("Pelicula no encontrado");
            }
            return HttpResponse.ok(deletedFilm, "Pelicula eliminado correctamente");
        } catch (error) {
            return HttpResponse.error("Error al eliminar la Pelicula");
        }
    },
    update: async (id: number, body: { title?: string; description?: string; release_year?:string; language_id?:number }) => {
        try {
            const updatedFilm = await FilmService.update(id, body.title, body.description, body.release_year, body.language_id);
            if (!updatedFilm) {
                return HttpResponse.notFound("Pelicula no encontrado");
            }
            return HttpResponse.ok(updatedFilm, "Pelicula actualizado correctamente");
        } catch (error) {
            return HttpResponse.error("Error al actualizar la Pelicula");
        }
    }
};
