import { Body, Controller, Get, Post } from '@nestjs/common';
import { HeroesDTO } from './DTO/HerosDTO.dto';
import { HeroesService } from './heroes.service';
import { Heroes } from './Interfaces/heroes.interface';

@Controller('superheroes')
export class HeroesController {
    constructor(private readonly service : HeroesService){}

     /**
     * Handles GET requests to fetch all superheroes.
     * @returns An array of heroes.
     */
    @Get()
    getSuperHeroes() : Heroes[]{        
        return this.service.fetchAll();
    }

    /**
     * Handles POST requests to insert a new superhero.
     * @param Heroes - The hero data received from the request body (DTO format).
     * @returns A promise that resolves to a success message.
     */
    @Post()
    insertSuperHeroes(@Body() Heroes : HeroesDTO) :Promise<string>{
      return this.service.insertSuperHero(Heroes);
    }

}
