import { FilmRepository } from '../repositories/film.repos.ts';

export const FilmService = {
    getAll: () => FilmRepository.findAll(),
    getById: (id: number) => FilmRepository.findById(id),
    add: (title: string, description: string, release_year:string,language_id:number) =>
        FilmRepository.add({ title, description, release_year, language_id }),
    update: (id: number, title?: string, description?: string, release_year?:string, language_id?:number) =>
        FilmRepository.update(id,  {title, description, release_year, language_id}),
    delete: (id: number) => FilmRepository.delete(id)

};
