import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  PaginationDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { DetalleCronogramaEntity } from '../entities/detalle-cronograma.entity';

@Injectable()
export class VotosService {
  constructor(
    @Inject(RepositoryEnum.DETALLECRONOGRAMA_REPOSITORY)
    private detalleCronogramaRepository: Repository<DetalleCronogramaEntity>,
    /*private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService*/
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.detalleCronogramaRepository.findAndCount({
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
    const nuevoDetalleCronograma = this.detalleCronogramaRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    const creacionDetalleCronograma = await this.detalleCronogramaRepository.save(nuevoDetalleCronograma);

    return { data: creacionDetalleCronograma };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.detalleCronogramaRepository.findAndCount({
      relations: [''],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const detalleCronograma = await this.detalleCronogramaRepository.findOne({
      relations: [''],
      where: {
        id,
      },
    });

    if (!detalleCronograma) {
      throw new NotFoundException(`El voto con el id:  ${id} no se encontro`);
    }
    return { data: detalleCronograma };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const detalleCronograma = await this.detalleCronogramaRepository.findOneBy({ id });
    if (!detalleCronograma) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.detalleCronogramaRepository.merge(detalleCronograma, payload);
    const detalleCronogramaActualizado = await this.detalleCronogramaRepository.save(detalleCronograma);
    return { data: detalleCronogramaActualizado };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const detalleCronograma = await this.detalleCronogramaRepository.findOneBy({ id });

    if (!detalleCronograma) {
      throw new NotFoundException(`El voto con el :  ${id} no se encontro`);
    }

    const detalleCronogramaELiminado = await this.detalleCronogramaRepository.softRemove(detalleCronograma);

    return { data: detalleCronogramaELiminado };
  }

  async removeAll(payload: DetalleCronogramaEntity[]): Promise<ServiceResponseHttpModel> {
    const detalleCronogramaEliminados = await this.detalleCronogramaRepository.softRemove(payload);
    return { data: detalleCronogramaEliminados};
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<DetalleCronogramaEntity>
      | FindOptionsWhere<DetalleCronogramaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ fechaInicioTareaCronograma: ILike(`%${search}%`) });
      where.push({ fechaFinalizacionTareaCronograma: ILike(`%${search}%`) });
      where.push({ responsableTareaCronograma: ILike(`%${search}%`) });
      where.push({ descripcionDetalleTareaCronograma: ILike(`%${search}%`) });
      where.push({ estadoDetalleCronograma: ILike(`%${search}%`) });
    }

    const response = await this.detalleCronogramaRepository.findAndCount({
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