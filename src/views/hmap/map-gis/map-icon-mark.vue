<!-- 点标注组件 -->
<template>
  <div />
</template>

<script>
import { Vector as SourceVector } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon, Stroke, Fill, Text } from 'ol/style';
import { Vector as LayerVector } from 'ol/layer';
export default {
  name: 'MapIconMark',
  props: {
    position: {
      type: Array,
      default: () => {
        return [];
      }
    },
    elementName: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  data() {
    return {
      iconLayer: null
    };
  },
  watch: {
    position: {
      handler(newVal, oldVal) {
        this.MapIconMark();
      },
      deep: true
    },
    elementName:{
      handler (newVal, oldVal) {
        this.MapIconMark();
      },
      deep: true
    },
    className:{
      handler (newVal, oldVal) {
        this.MapIconMark();
      },
      deep: true
    },
    label:{
      handler (newVal, oldVal) {
        this.MapIconMark();
      },
      deep: true
    },
    icon:{
      handler (newVal, oldVal) {
        this.MapIconMark();
      },
      deep: true
    },
    zIndex:{
      handler () {
        this.MapIconMark();
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.MapIconMark();
    });
  },
  methods: {
    // 单个标注
    MapIconMark() {
      const _that = this;
      if(_that.iconLayer) {
        _that.iconLayer.getSource().clear();
      }
      // 创建矢量容器
      const vectorSource = new SourceVector({});
      // 创建图标特性
      const iconFeature = new Feature({
        type: 'icon',
        name: _that.elementName || 'el-mapIconMark',
        geometry: new Point(this.position)
      });
      // 图标特性添加到矢量容器
      vectorSource.addFeature(iconFeature);
      // 创建矢量层
      _that.iconLayer = new LayerVector({
        className: _that.className || 'map-icon-mark',
        source: vectorSource,
        zIndex: _that.zIndex || 800,
        // 创建图标样式
        style: new Style({
          image: new Icon({
            src: _that.icon || null
          }),
          // 文本样式
          text: new Text({
            text: _that.label || null,
            fill: new Fill({
              color: '#fff'
            }),
            font: '14px Microsoft YaHei',
            offsetX: 0,
            offsetY: 30,
            padding:[ 2, 10, 0, 10],
            // 文本边框
            backgroundStroke: new Stroke({
              color: '#f00',
              width: 1
            }),
            // 文本填充
            backgroundFill: new Fill({
              color:'rgba(0,0,0,0.5)'
            })
          })
        })
      });
      _that.$parent.$data.mapData.addLayer(_that.iconLayer);
    }
  },
  render() {
    return this.$parent.preventChildrenRender;
  }
};
</script>
