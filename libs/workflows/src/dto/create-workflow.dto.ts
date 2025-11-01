/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  buildingId: number;
}
