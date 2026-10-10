"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://192.168.1.21:5173',
        ],
        methods: [
            'GET',
            'POST',
            'PATCH',
            'PUT',
            'DELETE',
            'OPTIONS',
        ],
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.useBodyParser('json', {
        limit: '50mb',
    });
    const port = Number(process.env.PORT ?? 3001);
    await app.listen(port);
    console.log(`Server running on http://localhost:${port}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map