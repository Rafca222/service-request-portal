import { IsString, IsNotEmpty, IsIn, IsOptional,IsEmail } from 'class-validator';

export class CreateServiceRequestDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsIn(['IT', 'HR', 'Facilities', 'Finance'])
  category!: string;

  @IsOptional()
  @IsString()
  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  priority?: string;

  @IsString()
  @IsNotEmpty()
  requesterName!: string;

  @IsEmail()
  requesterEmail!: string;
}