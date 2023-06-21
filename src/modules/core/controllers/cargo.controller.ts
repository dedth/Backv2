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

  import { CargoEntity } from '@core/entities';
  
  import { ResponseHttpModel } from '@shared/models';
  import { CargoService } from '../services/cargo.service';
  
  @ApiTags('Cargo')
  @Controller('cargo')
  export class CargoController {
    constructor(private cargoService: CargoService) {}
  
    @ApiOperation({ summary: 'Create Candidato Lista' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.create(payload);
      return {
        data: serviceResponse.data,
        message: `Candidato Lista fue creado`,
        title: 'Candidato Lista Creado',
      };
    }
  
    @ApiOperation({ summary: 'Find All Institutions' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.findAll(params);
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Find all institutions`,
        title: 'Success',
      };
    }
  
    @ApiOperation({ summary: 'Find Institution' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.findOne(id);
      return {
        data: serviceResponse.data,
        message: 'Find Institution',
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
      const serviceResponse = await this.cargoService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: 'Institution was updated',
        title: `Institution Updated`,
      };
    }
  
    @ApiOperation({ summary: 'Delete Institution' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.remove(id);
      return {
        data: serviceResponse.data,
        message: 'Institution was deleted',
        title: 'Institution Deleted',
      };
    }
  
    @ApiOperation({ summary: 'Delete All Institutions' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: CargoEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cargoService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Institutions was deleted',
        title: 'Institutions Deleted',
      };
    }
  }
  