import { IsString, IsIn, IsOptional, IsEmail } from 'class-validator';

export class UpdateServiceRequestDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['IT', 'HR', 'Facilities', 'Finance'])
  category?: string;

  @IsOptional()
  @IsString()
  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  priority?: string;

  @IsOptional()
  @IsString()
  @IsIn(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CANCELLED'])
  status?: string;

  @IsOptional()
  @IsString()
  requesterName?: string;

  @IsOptional()
  @IsEmail()
  requesterEmail?: string;
}