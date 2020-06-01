<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :page.sync="page"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @refresh-change="fetch"
      @on-load="changePage"
      @sort-change="sortChange"
      @search-change="search"
    >
    </avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string;
  data = {};
  option: any = {};
  page = {
    total: 0,
    // pageSize: 2,
    // pageSizes: [2, 5, 10],
  };
  query: any = {
    limit: null,
    page: null,
    sort: null,
    where: null,
  };

  async changePage({ pageSize, currentPage }) {
    this.query.limit = pageSize;
    this.query.page = currentPage;
    this.fetch();
  }
  async sortChange({ prop, order }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === 'ascending' ? 1 : -1,
      };
    }
    this.fetch();
  }
  async search(form, done) {
    for (let k in form) {
      const field = this.option.column.find((v) => v.prop === k);
      if (field.regex) {
        form[k] = { $regex: form[k] };
      }
    }
    this.query.where = form;
    this.fetch();
    done();
  }

  async create(row, done) {
    console.log(row);
    await this.$http.post(`${this.resource}`, row);
    this.$message.success('添加成功');
    this.fetch();
    done();
  }
  async update(row, index, done) {
    console.log(row);
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
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
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.$message.success('删除成功');
    this.fetch();
  }

  // async uploadBefore(file, done, loading, column) {
  //   console.log(file, column);
  //   //如果你想修改file文件,由于上传的file是只读文件，必须复制新的file才可以修改名字，完后赋值到done函数里,如果不修改的话直接写done()即可
  //   var newFile = new File([file], '1234', { type: file.type });
  //   done(newFile);
  //   this.$message.success('上传前的方法');
  // }

  // async uploadAfter(res, done, loading, column) {
  //   console.log(res, column);
  //   done();
  //   this.$message.success('上传后的方法');
  // }
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
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query,
      },
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }

  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style>
body .avue-upload__avatar {
  height: auto;
}
</style>
