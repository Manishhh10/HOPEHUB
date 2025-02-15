// server/models/fund.model.ts
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from "@sequelize/core";
  import {
    Table,
    PrimaryKey,
    AutoIncrement,
    NotNull,
    CreatedAt,
    UpdatedAt,
  } from "@sequelize/core/decorators-legacy";
  
  @Table({ underscored: true })
  export class Fund extends Model<
    InferAttributes<Fund>,
    InferCreationAttributes<Fund>
  > {
    @PrimaryKey
    @AutoIncrement
    @NotNull
    declare id: CreationOptional<number>;
  
    @NotNull
    declare title: string;
  
    @NotNull
    declare category: string;
  
    @NotNull
    declare reason: string;
  
    @NotNull
    declare state: string;
  
    @NotNull
    declare city: string;
  
    @NotNull
    declare donation_amount: number;
  
    @NotNull
    declare donation_start_date: Date;
  
    @NotNull
    declare donation_end_date: Date;
  
    // This will store the ID of the user who created the fund.
    declare created_by: number;
  
    @CreatedAt
    declare created_at: CreationOptional<Date>;
  
    @UpdatedAt
    declare updated_at: CreationOptional<Date>;
  }
  