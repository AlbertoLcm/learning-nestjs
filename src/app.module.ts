import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PostsModule, EventsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
