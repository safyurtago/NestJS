"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const { env } = process;
        await app.listen(env.PORT, () => {
            console.log("listening on port " + env.PORT);
        });
    }
    catch (error) {
        console.log(error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map