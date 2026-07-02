import { Controller, Get, Post,Patch, Delete, Body, Param, Query  } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';


@Controller('service-requests')
export class ServiceRequestsController {
    constructor(private readonly serviceRequestsService: ServiceRequestsService) {}

    @Post()
    create(@Body() dto: CreateServiceRequestDto) {
        return this.serviceRequestsService.create(dto);
    }   

    @Get()
    findAll(@Query('search') search?: string) {
    return this.serviceRequestsService.findAll(search);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.serviceRequestsService.findOne(id);
    }   

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateServiceRequestDto) {
        return this.serviceRequestsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.serviceRequestsService.remove(id);
    }
}
