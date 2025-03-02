// server/src/models/fund.model.ts
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  Table,
  CreatedAt,
  UpdatedAt,
  NotNull,
  Default,
} from "@sequelize/core/decorators-legacy";
import { User } from "./user.model.js";

@Table({ tableName: "funds" })
export class Fund extends Model<
  InferAttributes<Fund>,
  InferCreationAttributes<Fund>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare category: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare reason: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare state: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare city: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare image_url: CreationOptional<string>;

  @Attribute(DataTypes.FLOAT)
  @NotNull
  declare target_amount: number;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare start_date: Date;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare end_date: Date;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: ForeignKey<User["id"]>;

  // NEW: Track donation progress
  @Attribute(DataTypes.FLOAT)
  @Default(0)
  declare amount_raised: number;

  @Attribute(DataTypes.INTEGER)
  @Default(0)
  declare donation_count: number;

  // NEW: Status of the fund ("pending", "verified", or "failed")
  @Attribute(DataTypes.STRING)
  @Default("pending")
  declare status: string;

  // NEW: Optional failure reason if status is "failed"
  @Attribute(DataTypes.TEXT)
  declare failure_reason: string | null;

  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @UpdatedAt
  declare updated_at: CreationOptional<Date>;
}
