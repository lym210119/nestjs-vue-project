import { Prop, ModelOptions } from '@typegoose/typegoose';

@ModelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Episode {
  @Prop()
  name: string;

  @Prop()
  file: string;
}
