import { Prop, ModelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from './course.model';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @Prop()
  name: string;

  @Prop()
  file: string;

  @ApiProperty({ description: '所属课程' })
  @Prop({ ref: 'Course' }) // 数组中每个元素参考的类型
  course: Ref<Course>; // Ref 参考类型参考的具体类型是 Course
}
