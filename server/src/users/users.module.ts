//import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  //imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
