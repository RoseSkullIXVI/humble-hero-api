import { IsString,  Min , Max, IsIn, IsInt } from "class-validator"

/*
This is a Data transfer object to validate the insert of a hero before entering the DB (array)
Variables: 
 - Name -> String 
 - Superpower -> String
 - Humility Score -> Number (Values: 0 - 10)
*/
export class HeroesDTO {

    @IsString()
    name:string


    @IsString()
    superPower:string


    @IsInt()
    @Min(0,{ message: 'Humility score must be greater than or equal to 0' })
    @Max(10,{ message: 'Humility score cannot be greater than 10' })
    humilityScore:number
}