import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
 
  PaginationDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { TipoListaEntity } from '../entities/tipo-lista.entity';

@Injectable()
export class tipoListasService {
  constructor(
    @Inject(RepositoryEnum.TIPOLISTA_REPOSITORY)
    private tipoListaRepository: Repository<TipoListaEntity>,
    /*private tipoListaService: InstitutionsService,
    private cataloguesService: CataloguesService*/
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.tipoListaRepository.findAndCount({
      relations: [],
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
    const nuevoTipoLista = this.tipoListaRepository.create(payload);

    // newCareer.institution = await this.tipoListasService.findOne(
    //   payload.institution.id,
    // );

    const creacionTipoLista = await this.tipoListaRepository.save(nuevoTipoLista);

    return { data: creacionTipoLista };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.tipoListaRepository.findAndCount({
      relations: [],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const tipoLista = await this.tipoListaRepository.findOne({
      relations: [],
      where: {
        id,
      },
    });

    if (!tipoLista) {
      throw new NotFoundException(`El TipoLista con el id:  ${id} no se encontro`);
    }
    return { data: tipoLista };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const voto = await this.tipoListaRepository.findOneBy({ id });
    if (!voto) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.tipoListaRepository.merge(voto, payload);
    const tipoListaActualizado = await this.tipoListaRepository.save(voto);
    return { data: tipoListaActualizado };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const tipoLista = await this.tipoListaRepository.findOneBy({ id });

    if (!tipoLista) {
      throw new NotFoundException(`El tipoLista con el :  ${id} no se encontro`);
    }

    const tipoListaELiminado = await this.tipoListaRepository.softRemove(tipoLista);

    return { data: tipoListaELiminado };
  }

  async removeAll(payload: TipoListaEntity[]): Promise<ServiceResponseHttpModel> {
    const tipoListaEliminados = await this.tipoListaRepository.softRemove(payload);
    return { data: tipoListaEliminados};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TipoListaEntity>
      | FindOptionsWhere<TipoListaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
        search = search.trim();
        page = 0;
        where = [];
        where.push({ nombreTipoLista: ILike(`%${search}%`) });
      }

    const response = await this.tipoListaRepository.findAndCount({
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