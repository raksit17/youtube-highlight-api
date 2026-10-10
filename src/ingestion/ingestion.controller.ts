import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { randomUUID } from 'node:crypto';

import { mkdirSync } from 'node:fs';

import { extname } from 'node:path';

import { diskStorage } from 'multer';

import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('json')
  async ingestJson(@Body() body: unknown) {
    return await this.ingestionService.ingestJson(body);
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_request, _file, callback) => {
          const directory = './tmp/imports';

          mkdirSync(directory, {
            recursive: true,
          });

          callback(null, directory);
        },

        filename: (_request, file, callback) => {
          callback(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),

      limits: {
        fileSize: 500 * 1024 * 1024,
      },

      fileFilter: (_request, file, callback) => {
        const isJson =
          file.mimetype === 'application/json' ||
          extname(file.originalname).toLowerCase() === '.json';

        if (!isJson) {
          return callback(
            new BadRequestException('Only JSON files are allowed'),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  ingestFile(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('JSON file is required');
    }

    return this.ingestionService.ingestFile(file);
  }
}
