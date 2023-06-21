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

  import { ConfiguracionEntity } from '@core/entities';
  import { ConfiguracionService } from '../services/configuracion.service';
  import { ResponseHttpModel } from '@shared/models';
  
  @ApiTags('Configuracion')
  @Controller('configuracion')
  export class ConfiguracionController {
    constructor(private ConfiguracionService: ConfiguracionService) {}
  
    @ApiOperation({ summary: 'Create Configuracion' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Su configuracion ha sido creada`,
        title: 'Configuracion Creada',
      };
    }
  
    @ApiOperation({ summary: 'Find Configuracion' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Buscar las Configuraciones Ej:codigoReseteoClave= 1020`,
        title: 'Success',
      };
    }
  
    @ApiOperation({ summary: 'Find Configuracion' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Mostrar Configuracion',
        title: `Success`,
      };
    }
  
    @ApiOperation({ summary: 'Update Configuracion' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload:any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Su Configuracion fue actualizada',
        title: `Configuracion Updated`,
      };
    }
  
    @ApiOperation({ summary: 'Delete Configuracion' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Su configuracion fue eliminada',
        title: 'Configuracion Deleted',
      };
    }
  
    @ApiOperation({ summary: 'Delete All Configuracion' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: ConfiguracionEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.ConfiguracionService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos las configuraciones han sido eliminadas',
        title: 'Configuracion Deleted',
      };
    }
  }