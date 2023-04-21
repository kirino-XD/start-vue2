<template>
  <div>
    <el-form
      ref="form"
      :model="formParams"
      label-width="100px"
      class="temp-form"
    >
      <el-form-item
        v-for="(item, index) in formData"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
      >
        <el-time-picker
          v-if="item.type === 'date'"
          v-model="formParams[item.prop]"
        />
        <el-table
          v-if="item.type === 'table'"
          :data="formParams[item.prop]"
        >
          <el-table-column
            label="姓名"
          >
            <template #default="scope">
              <el-form-item
                :prop="`${item.prop}[${scope.$index}].name`"
                :rules="item.childrenRules.name"
              >
                <el-input
                  v-model="scope.row.name"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
          >
            <template #default="scope">
              <el-form-item
                :prop="`${item.prop}[${scope.$index}].sex`"
                :rules="item.childrenRules.sex"
              >
                <el-input
                  v-model="scope.row.sex"
                />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-button @click="submitFun">
      提交
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      formParams: {
        date: '',
        tables: []
      },
      formData: [
        {
          type: 'date',
          label: '日期',
          prop: 'date',
          rules: [
            {
              required: true, message: '请选择日期'
            }
          ]
        },
        {
          type: 'table',
          label: '',
          prop: 'tables',
          childrenRules: {
            name: [{  required: true, message: '请输入姓名' }],
            sex: [{ required: true, message: '请输入性别' }]
          }
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.formParams.tables = [
        {
          name: '张三',
          sex: '男'
        }
      ];
    },
    submitFun() {
      this.$refs.form.validate(valid => {
        if(!valid) return;

        console.log(this.formParams);
      });
    }
  }
};
</script>

<style scoped lang="less">

</style>
