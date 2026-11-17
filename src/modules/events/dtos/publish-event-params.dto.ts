import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PublishEventParamsDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'eventId must not be blank' })
  eventId!: string;
}
