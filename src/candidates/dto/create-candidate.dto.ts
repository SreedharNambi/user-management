import { IsString, IsEmail, IsNumber, Min, Max } from "class-validator";
import { IsGreaterThanOrEqualToCurrentDate } from "src/custom-decorator/date-validator";

export class CreateCandidateDto{

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNumber()
    @Min(20) @Max(50)
    age: number;

    @IsString()
    phone: string;

    @IsGreaterThanOrEqualToCurrentDate()
    joiningDate: string;
}


