import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CandidateResponseDto{

    @IsArray()
    @Type(()=> CandidateDto)
    @ValidateNested()
    data: CandidateDto[] =[];

    @IsNumber()
    @IsOptional()
    total?: number = 0;

    @IsNumber()
    @IsOptional()
    offset?: number = 0;


}


export class CandidateDto{

    @IsString()
    candidateId: string;

    @IsString()
    name: string;

    @IsNumber()
    age: Number;

    @IsString()
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    joiningDate: string;

    @IsString()
    createdDt?: string;
}