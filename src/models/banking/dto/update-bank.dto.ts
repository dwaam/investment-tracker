import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBankDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name: string;
}
