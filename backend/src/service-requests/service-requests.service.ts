import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { PrismaService } from '../lib/database/prisma.service';

@Injectable()
export class ServiceRequestsService {
    constructor(private readonly prisma: PrismaService) {}

    create(dto: CreateServiceRequestDto) {
        return this.prisma.serviceRequest.create({
            data: dto,
        });
    }

    findAll(search?: string) {
  return this.prisma.serviceRequest.findMany({
    where: search
      ? {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
  });
 
        
    }  
    
    async findOne(id: string) {
        const serviceRequest = await this.prisma.serviceRequest.findUnique({
            where: { id },
        });
        if (!serviceRequest) {
            throw new NotFoundException(`Service request with ID ${id} not found`);
        }
        return serviceRequest;
    }

    async update(id: string, dto: UpdateServiceRequestDto) {
        await this.findOne(id); // Check if the service request exists
        return this.prisma.serviceRequest.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: string) {
        await this.findOne(id); // Check if the service request exists
        return this.prisma.serviceRequest.delete({
            where: { id },
        });
    }
}
