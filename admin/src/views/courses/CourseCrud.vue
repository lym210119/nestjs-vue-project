<template>
  <div>
    <avue-crud
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @refresh-change="fetch"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class CourseList extends Vue {
  data = {};
  option = {
    title: '表格的22标题',
    page: false,
    align: 'center',
    menuAlign: 'center',
    column: [
      // {
      //   label: 'ID',
      //   prop: '_id',
      // },
      {
        label: '课程名称',
        prop: 'name',
      },
      {
        label: '课程封面',
        prop: 'cover',
      },
    ],
  };

  async create(row, done) {
    console.log(row);
    await this.$http.post(`courses`, row);
    this.$message.success('添加成功');
    this.fetch();
    done();
  }
  async update(row, index, done) {
    console.log(row);
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`courses/${row._id}`, data);
    this.$message.success('修改成功');
    this.fetch();
    done();
  }
  async remove(row) {
    try {
      await this.$confirm(`确定要删除 ${row.name} 吗`, {
        type: 'warning',
      });
    } catch (error) {
      return;
    }
    await this.$http.delete(`courses/${row._id}`);
    this.$message.success('删除成功');
    this.fetch();
  }

  // beforeOpen(done, type) {
  //   this.$alert(`我是${type}`, {
  //     confirmButtonText: '确定',
  //     callback: () => {
  //       if (['views', 'edit'].includes(type)) {
  //         // 查看和编辑逻辑
  //       } else {
  //         //新增逻辑
  //         //一定要用setTimeout包裹，由于form组件底层一些机制的设计
  //         setTimeout(() => {
  //           this.form.name = '初始化赋值';
  //         }, 0);
  //       }
  //       done();
  //     },
  //   });
  // }

  async fetch() {
    const res = await this.$http.get('courses');
    this.data = res.data;
  }

  created() {
    this.fetch();
  }
}
</script>

<style></style>
