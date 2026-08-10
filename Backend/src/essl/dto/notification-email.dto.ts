import { IsEmail } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class NotificationEmailDto {
  @Trim() @IsEmail() email: string;
}
