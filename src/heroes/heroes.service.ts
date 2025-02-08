import { BadRequestException, Injectable } from '@nestjs/common';
import { Heroes } from './Interfaces/heroes.interface';
import { HeroesDTO } from './DTO/HerosDTO.dto';

@Injectable()
export class HeroesService {
    private SuperHeroes: Heroes[] = [];
    private heroID = 1;


    /**
    * Inserts a new superhero into the list.
    * @returns A promise that resolves to a success message.
    * @throws BadRequestException if the superhero already exists.
    */
    async insertSuperHero(superHero: HeroesDTO): Promise<string> {
        const existingHero = this.SuperHeroes.find(hero => hero.name === superHero.name);

        if (existingHero) {
            throw new BadRequestException("The Superhero you provided already exists");
        }

        const newHero: Heroes = { ID: this.heroID++, ...superHero };
        this.SuperHeroes.push(newHero);

        return "Insertion of new Superhero was Succesfull"
    }

    /**
    * Fetches all superheroes sorted by humility score in ascending order.
    * @returns An array of superheroes sorted by humility score.
    */
    fetchAll(): Heroes[] {
        return this.SuperHeroes.sort((a, b) => b.humilityScore - a.humilityScore);
    }



}
