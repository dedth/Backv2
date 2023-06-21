import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity('cronogramas', {schema: 'core'})
  export class CronogramaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name:'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de creacion de actividad del cronograma',
    })

    createdAt: Date;

    @UpdateDateColumn({
        name: 'update_at',
        type: 'timestamptz',
      })
      updateAt: Date;
    
      @DeleteDateColumn({
        name: 'delete_at',
        type: 'timestamptz',
      })
      deleteAt: Date;
    /*
      @OneToOne(() => CatalogueEntity)
      @JoinColumn({ name: 'address_id' })
      address: CatalogueEntity;
    
      @ManyToOne(() => CatalogueEntity)
      @JoinColumn({ name: 'state_id' })
      state: CatalogueEntity;
    */
      @Column('varchar', {
        name: 'periodo_lectivo',
        length: 10,
        nullable: true,
        unique: true,
        comment: 'Periodo lectivo en que se lleva a cabo el proceso electoral',
      })
      periodoLectivo: string;
    
      @Column({
        name: 'fecha_creacion_cronograma',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de creacion del cronograma',
      })

      fechaCreacionCronograma: Date;
    
      @Column('varchar', {
        name: 'responsable_cronograma',
        length: 50,
        comment: 'Nombre del responsable del cronograma',
      })
      responsableCronograma: string; 
  }
