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
import {
 
} from '@core/dto';
import {  CandidatoListaEntity } from '@core/entities';

import { ResponseHttpModel } from '@shared/models';
import { CandidatoListaService } from '../services/candidato-lista.service';

@ApiTags('CandidatoLista')
@Controller('candidatoLista')
export class CandidatoListaController {
  constructor(private candidatoListaService: CandidatoListaService) {}

  @ApiOperation({ summary: 'Create Candidato Lista' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoListaService.create(payload);
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
    const serviceResponse = await this.candidatoListaService.findAll(params);
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
    const serviceResponse = await this.candidatoListaService.findOne(id);
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
    const serviceResponse = await this.candidatoListaService.update(id, payload);
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
    const serviceResponse = await this.candidatoListaService.remove(id);
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
    @Body() payload: CandidatoListaEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.candidatoListaService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: 'Institutions was deleted',
      title: 'Institutions Deleted',
    };
  }
}
