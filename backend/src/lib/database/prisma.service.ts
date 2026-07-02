import {Injectable , OnModuleInit} from '@nestjs/common'; //injectable = decorator(used for dependency injection) , OnModuleInit = interface (used to perform some action when the module is initialized)
import {PrismaClient} from '@prisma/client'; //inherits everything from prisma's generated client (all the db methods)

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }               
}