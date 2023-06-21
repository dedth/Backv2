import { DataSource } from 'typeorm';
import {
  TipoUsuarioEntity,
  UsuarioEntity,
  RolEntity,
} from '@auth/entities';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';

export const authProviders = [
  {
    provide: RepositoryEnum.TIPOUSUARIO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TipoUsuarioEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE]
  },
   
  {
    provide: RepositoryEnum.USUARIO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsuarioEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE]
  },

  {
    provide: RepositoryEnum.ROL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RolEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE]
  },
];
