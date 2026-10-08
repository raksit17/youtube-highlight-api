import { BadRequestException, Injectable } from '@nestjs/common';

import { readFile } from 'node:fs/promises';

@Injectable()
export class JsonFileParser {
  async parse(filePath: string): Promise<unknown> {
    let raw: string;

    try {
      raw = await readFile(filePath, 'utf8');
    } catch {
      throw new BadRequestException('Unable to read JSON file');
    }

    try {
      return JSON.parse(raw);
    } catch {
      throw new BadRequestException('Invalid JSON file');
    }
  }
}
