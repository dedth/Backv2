import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  PaginationDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { CandidatoEntity } from '../entities/candidato.entity';

@Injectable()
export class CandidatoService {
  constructor(
    @Inject(RepositoryEnum.CANDIDATO_REPOSITORY)
    private candidatoRepository: Repository<CandidatoEntity>,
    /*private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService*/
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.candidatoRepository.findAndCount({
      relations: [''],
      take: 1000,
    });

    return {
      pagination: {
        totalItems: response[1],
        limit: 10,
      },
      data: response[0],
    };
  }

  async create(payload: any): Promise<ServiceResponseHttpModel> {
    const nuevoCandidato = this.candidatoRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    const creacionCandidato = await this.candidatoRepository.save(nuevoCandidato);

    return { data: creacionCandidato };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.candidatoRepository.findAndCount({
      relations: [''],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const candidato = await this.candidatoRepository.findOne({
      relations: [''],
      where: {
        id,
      },
    });

    if (!candidato) {
      throw new NotFoundException(`El voto con el id:  ${id} no se encontro`);
    }
    return { data: candidato };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const candidato = await this.candidatoRepository.findOneBy({ id });
    if (!candidato) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.candidatoRepository.merge(candidato, payload);
    const candidatoActualizado = await this.candidatoRepository.save(candidato);
    return { data: candidatoActualizado };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const candidato = await this.candidatoRepository.findOneBy({ id });

    if (!candidato) {
      throw new NotFoundException(`El voto con el :  ${id} no se encontro`);
    }

    const candidatoELiminado = await this.candidatoRepository.softRemove(candidato);

    return { data: candidatoELiminado };
  }

  async removeAll(payload: CandidatoEntity[]): Promise<ServiceResponseHttpModel> {
    const candidatosEliminados = await this.candidatoRepository.softRemove(payload);
    return { data: candidatosEliminados};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CandidatoEntity>
      | FindOptionsWhere<CandidatoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ dignidadCandidato: ILike(`%${search}%`) });
      where.push({ matriculaCandidato: ILike(`%${search}%`) });
    }

    const response = await this.candidatoRepository.findAndCount({
      relations: [''],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }
}