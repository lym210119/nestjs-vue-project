import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course,
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  option() {
    return {
      title: '课程管理',
      page: false,
      searchShow: false,
      column: [
        {
          label: '课程名称',
          sortable: true,
          search: true,
          regex: true, // 是否支持正则表达式查询（模糊查询）
          prop: 'name',
          row: true,
          span: 24,
        },
        {
          label: '课程封面',
          prop: 'cover',
          type: 'upload',
          listType: 'picture-img',
          row: true,
          // propsHttp: {
          //   res: 'data'
          // },
          width: 120,
          tip: '只能上传jpg/png文件，且不超过500kb',
          action: 'upload',
        },
      ],
    };
  }
}
