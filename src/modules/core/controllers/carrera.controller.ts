import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';

  import { CarreraEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { CarreraService } from '../services/carrera.service';
  
  @ApiTags('Carrera')
  @Controller('carrera')
  export class CarreraController {
    constructor(private CarreraService: CarreraService) {}
  
    @ApiOperation({ summary: 'Create Carrera' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Su carrera ha sido creada`,
        title: 'Carrera Creado',
      };
    }
  
    @ApiOperation({ summary: 'Find Carrera' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Buscar las carreras acutuales Ej:Docente, Ej:Desarrollo de Software`,
        title: 'Success',
      };
    }
  
    @ApiOperation({ summary: 'Find Carrera' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Mostrar Lista',
        title: `Success`,
      };
    }
  
    @ApiOperation({ summary: 'Update Institution' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Su carrera fue actualizada',
        title: `Carrera Updated`,
      };
    }
  
    @ApiOperation({ summary: 'Delete Carrera' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Su carrera fue eliminada',
        title: 'Carrera Deleted',
      };
    }
  
    @ApiOperation({ summary: 'Delete All Carrera' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: CarreraEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.CarreraService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos las carreras han sido eliminadas',
        title: 'Carrera Deleted',
      };
    }
  }