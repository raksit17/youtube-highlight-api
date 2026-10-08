import { BadRequestException, Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { CollectorPayloadDto } from './dto/collector-payload.dto';
import { CollectorPayload } from './types/collector-payload.type';

@Injectable()
export class IngestionValidator {
  async validate(input: unknown): Promise<CollectorPayload<unknown>> {
    if (typeof input !== 'object' || input === null) {
      throw new BadRequestException('Payload must be a JSON object');
    }

    const dto = plainToInstance(CollectorPayloadDto, input);

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: false,
    });

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Invalid collector payload',

        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints ?? {},
          children: error.children ?? [],
        })),
      });
    }

    if (!dto.success) {
      throw new BadRequestException('Collector result was not successful');
    }

    return dto;
  }
}
