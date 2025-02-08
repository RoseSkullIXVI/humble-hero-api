import { Test, TestingModule } from '@nestjs/testing';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { HeroesDTO } from './DTO/HerosDTO.dto';
import { BadRequestException } from '@nestjs/common';

describe('HeroesController', () => {
  let controller: HeroesController;
  let service:HeroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers:[{
        provide:HeroesService,
        useValue:{
          insertSuperHero : jest.fn(),
        }
      }]
    }).compile();

    controller = module.get<HeroesController>(HeroesController);
    service = module.get<HeroesService>(HeroesService);
  });

  it('should insert a new superhero successfully', async () => {
    const heroDto: HeroesDTO = { name: 'Batman', superPower: 'Agility', humilityScore: 6 };
    jest.spyOn(service, 'insertSuperHero').mockResolvedValue('Insertion of new Superhero was successful');

    const result = await controller.insertSuperHeroes(heroDto);

    expect(result).toBe('Insertion of new Superhero was successful');
    expect(service.insertSuperHero).toHaveBeenCalledWith(heroDto);
  });

  
  it('should throw an error if superhero already exists', async () => {
    const heroDto: HeroesDTO = { name: 'Batman', superPower: 'Agility', humilityScore: 6 };
    jest.spyOn(service, 'insertSuperHero').mockRejectedValue(new BadRequestException('The Superhero you provided already exists'));


    await expect(controller.insertSuperHeroes(heroDto)).rejects.toThrow(BadRequestException);
    expect(service.insertSuperHero).toHaveBeenCalledWith(heroDto);
  });

  it('should throw an error if humility score is above 10', async () => {
    const heroDto: HeroesDTO = { name: 'Thor', superPower: 'Lightning', humilityScore: 12 };

    expect(async () => {await controller.insertSuperHeroes(heroDto)}).rejects.toThrow('Humility score cannot be greater than 10')
});
});
