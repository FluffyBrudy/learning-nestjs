import { Module } from '@nestjs/common';
import { YoutubeModule } from './youtube/youtube.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerConfig } from './pino.logger.config';

@Module({
  imports: [YoutubeModule, LoggerModule.forRoot(pinoLoggerConfig)],
})
export class AppModule {}
