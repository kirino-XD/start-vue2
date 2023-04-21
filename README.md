<!--
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-06-17 11:12:02
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-07 16:25:36
 * @FilePath: \rk-demo-vue2\README.md
 * @Version: 1.0.0
-->

## 一、基础环境要求
- Node版本：>=12.12.0

## 二、开发、管理工具
- VSCode 
- IDEA

## 三、框架介绍
- Vue 版本: v2.6.12
- Element UI：v2.15.6

## 四、环境介绍
### 启动服务
npm run dev

### 安装依赖
npm install

### 打包生产环境
npm run build:test
npm run build:prod
npm run zip

### 检测代码规范
npm run lint
npm run lint:style

### 修复代码规范
npm run lint --fix 
npm run fix:style

## 五、主要库
- Element https://element.eleme.io/#/zh-CN/component/installation
- lodash  JS实用工具库 https://www.lodashjs.com/
- svg-icon  图标库 https://www.freesion.com/article/4316893239/
- Mocker Mock模拟数据（开启MOCK：.env.development文件VUE_APP_NO_PROXY = 'false'）
- commitlint + stylelint   自动修复错误、格式化样式代码
- rem自适应布局 （不需要的话直接卸载postcss-px2rem、main.js注释掉import '@/utils/rem'; ）

## 说明
- rk-demo-vue2常见问题：https://www.kdocs.cn/l/cpJrwb5xK1ug

## 修复记录
### 2022-07-31
- 1、提交了axios二次封装库、cookie、storage工具类。npm run zip打包
- 2、添加了lodash
- 3、删除git commit

### 2022-07-30
- 1、改成less，去掉sass
- 2、字符串改成单引号
- 3、加入base.less（src\assets\styles\base.less）
- 4、去掉index.html中默认进入页面加载loading效果（public\index.html）
- 5、plugin:vue/recommended 代码换行 （.eslintrc.js）