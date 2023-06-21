import { Global, Module } from '@nestjs/common';
import {
  CandidatoListaController,
  CandidatoController,
  CargoController,
} from '@core/controllers';
import {
  CandidatoListaService,
  CargoService,
  CandidatoService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CandidatoListaController,
    CandidatoController,
    CargoController,
  ],
  providers: [
    ...coreProviders,
    CandidatoListaService,
    CandidatoController,
    CargoController,
  ],
  exports: [
    ...coreProviders,
    CandidatoListaService,
    CandidatoController,
    CargoService,
 ]})

export class CoreModule { }
