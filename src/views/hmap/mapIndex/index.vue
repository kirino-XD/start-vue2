<template>
  <div>
    <div id="map">
      <div class="hover-center">
        {{ clickCenter }} {{ zoom }}
      </div>
      <el-button @click="mapMove">
        点击定位到一个坐标
      </el-button>
      <h2 ref="mapOverlay">
        我是自定义覆盖物啦
      </h2>
      <div class="button-wrapper">
        <el-select
          v-model="drawType"
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          type="primary"
          @click="startDraw"
        >
          绘制
        </el-button>
        <el-button
          type="primary"
          @click="stopDraw(drawer)"
        >
          停止绘制
        </el-button>
        <el-button
          type="primary"
          @click="showDialogBtn"
        >
          弹窗
        </el-button>
      </div>
    </div>
    <div
      ref="dialog"
      class="dialog"
    >
      test<i
        class="el-icon-close"
        @click="closeDialog"
      />
    </div>
  </div>
</template>

<script>
import {mapCommonMixin} from '../map-mixin/map-common-mixin';
import icon from '../map-mixin/icon.png';
import startIcon from '../map-mixin/start.png';
import endIcon from '../map-mixin/end.png';
import t from '../map-mixin/t.json';
import 'ol/ol.css';
import Map from 'ol/Map'; // map
import { TileArcGISRest, Vector as SourceVector, Cluster } from 'ol/source'; // 源
import TileLayer from 'ol/layer/Tile'; // 瓦片
import View from 'ol/View'; // 视图
import * as olControl from 'ol/control'; // 控件
import { Feature } from 'ol'; // feature
import {Point, Polygon, Circle, LineString} from 'ol/geom'; // 几何体
import { Style, Icon, Fill, Stroke, Text } from 'ol/style'; // style
import { Vector as LayerVector } from 'ol/layer'; // layer
import Overlay from 'ol/Overlay'; // 覆盖物
import HMap from './hmap.js';
import './hmap.css';
export default {
  name: 'Hmap',
  mixins: [mapCommonMixin],
  data() {
    return {
      interactionDragBox: null,
      drawType: '',
      drawer: null,
      options: [
        {
          label: 'Point',
          value: 'Point',
        },
        {
          label: 'LineString',
          value: 'LineString',
        },
        {
          label: 'Polygon',
          value: 'Polygon',
        },
        {
          label: 'Circle',
          value: 'Circle',
        },
        {
          label: 'None',
          value: 'None',
        },
      ],

      mapObj: null, // map
      mapIconMarkLayer: null, // 添加点的图层
      mapPolygonLayer: null, // 添加多边形图层
      mapCircleLayer: null, // 添加圆形图层
      mapLineLayer: null, // 添加线
      mapOverlayLayer: null, // 添加自定义覆盖物
      mapCollectionLayer: null, // 添加海量点
      clickCenter: [0, 0], // 点击显示坐标
      zoom: 0 // 地图层级
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.minemapBase(() => {
        this.initMap();
        this.addMouseEvent(); // 鼠标点击事件
        // this.mapObj.on('pointermove', (evt) => {
        //   if(this.mapObj.hasFeatureAtPixel(evt.pixel)) {
        //     this.mapObj.getTargetElement().style.cursor = 'pointer';
        //   }else{
        //     this.mapObj.getTargetElement().style.cursor = '';
        //   }
        // });
        // this.mapObj.on('click', (e)=>{
        //   let eventData = this.getEventData(e);
        //   this.triggerEvent('mapClick', eventData, eventData.lonLat);
        // });
        // this.addMapIconMark(); // 添加图标的点
        // this.addMapPolygon(); // 添加多边形
        // this.addMapCircle(); // 添加圆形
        // this.addMapLine(); // 添加线
        // this.addMapOverlay(); // 添加自定义覆盖物
        // this.addMapPointCollection(); // 添加海量点
      });
    },
    initMap() {
      this.mapObj = new HMap('map', {
        controls: {
          loading: false,
          zoomSlider: false,
          fullScreen: false
        },
        interactions: {
          shiftDragZoom: false
        },
        view: {
          projection: 'EPSG:4326',
          center: [118.089425, 24.479883],
          zoom: 12
        },
        // baseLayers: [
        //   {
        //     layerName: 'openstreetmap',
        //     isDefault: true,
        //     layerType: 'OSM',
        //     layerUrl: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        //   }
        // ],
        // layers: [
        //   new TileLayer({
        //     source: new TileArcGISRest({
        //       url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'
        //     })
        //   })
        // ],
      });
      
      
      // this.clickLayer = this.getVectorLayer({
      //   icon: icon,
      //   anchor: [0.5, 1]
      // });
      
      // this.addMapEventListener('mapClick', (data, lonLat)=>{
      //   console.log(lonLat);
      //   // this.clearLayer(this.clickLayer);
      //   // this.showPoint(
      //   //   {
      //   //     layer: this.clickLayer,
      //   //     item: {
      //   //       lon: lonLat[0],
      //   //       lat: lonLat[1],
      //   //     },
      //   //   }
      //   // );
      // });
      // this.initLayers();
      console.log('this.mapObj', this.mapObj);
      let interactionDragBox = new ol.interaction.DragBox(
        {
          condition: ol.events.condition.platformModifierKeyOnly
        }
      );
      this.mapObj.addInteraction(interactionDragBox);
    },
    minemapBase(callback) {
      let head = document.getElementsByTagName('head')[0];
      // css
      let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = './hmap.css';
      head.appendChild(link);
      // js
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = './hmap.js';
      head.appendChild(script);
      // ji 标签加载完成
      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete' ) {
          script.onload = script.onreadystatechange = null;
          if(typeof callback === 'function') callback();
        }
      };
    },
    initLayers() {
      // this.polygonLayer = this.getVectorLayer();
      // this.showPolygon({
      //   layer: this.polygonLayer,
      //   text: [''],
      //   list: [
      //     t
      //   ]
      // });
      // this.iconLayer = this.getVectorLayer({icon: icon});
      // this.createSelect(
      //   {
      //     layers: [this.iconLayer],
      //     callback(e) {
      //       console.log(e);
      //     },
      //     style(feature) {
      //       return {
      //         icon: startIcon,
      //         text: feature.getProperties().text
      //       };
      //     }
      //   },
      // );
      // this.showPoint(
      //   {
      //     layer: this.iconLayer,
      //     item: {
      //       lon: 118.085,
      //       lat: 24.457,
      //       text: '111'
      //     },
      //     style(feature) {
      //       return {
      //         icon: startIcon,
      //         text: feature.getProperties().text
      //       };
      //     }
      //   }
      // );

      // this.iconLayerEnd = this.getVectorLayer(
      //   function (feature) {
      //     return {
      //       icon: endIcon,
      //       text: feature.getProperties().text
      //     };
      //   }
      // );
      // this.createSelect({
      //   style(feature) {
      //     return {
      //       icon: icon,
      //       text: feature.getProperties().text
      //     };
      //   },
      //   layers: [this.iconLayerEnd],
      //   callback(feature, info) {
      //     console.log(feature, info);
      //   }
      // });
      // this.showPoints({
      //   layer: this.iconLayerEnd,
      //   list: [
      //     {
      //       lonLat: [118.15364562988282, 24.507671026611323],
      //       text: '100'
      //     },
      //     {
      //       lonLat: [118.14368927001954, 24.456172613525386],
      //       text: '222'
      //     },
      //   ],
      //   style(feature) {
      //     return {
      //       icon: startIcon,
      //       text: feature.getProperties().text
      //     };
      //   },
      // });


      // let clusterList = [
      //   {
      //     lonLat: [118.18935119628907, 24.503551153564448],
      //     text: '100'
      //   },
      //   {
      //     lonLat: [118.19278442382813, 24.482951788330073],
      //     text: '222'
      //   },

      // ];
      // let clusterLayer = this.getClusterLayer((feature)=> {
      //   return {
      //     icon: icon,
      //     color: '#3399CC',
      //     text: feature.get('features')[0].getProperties().text
      //   };
      // });
      // this.showClusterPoints({layer: clusterLayer, list: clusterList});
      // this.createSelect({
      //   style: (feature)=> {
      //     return {
      //       icon: startIcon,
      //       color: 'orange',
      //       text: feature.get('features')[0].getProperties().text
      //     };
      //   },
      //   isCluster: true,
      //   layers: [clusterLayer],
      //   callback(feature, info) {
      //     console.log(feature, info);
      //     // console.log(feature.get('features'));
      //     // if(feature.)
      //     // console.log(feature, info);
      //   }
      // });
      // this.lineLayer = this.getVectorLayer();
      // this.drawLine([
      //   [118.2266017150879, 24.560886053466792],
      //   [118.24514114379883, 24.439006475830073],
      //   [118.16205703735352, 24.402270941162104]
      // ], this.lineLayer);
      this.drawVector = this.getVectorLayer();
    },
    showDialogBtn() {
      let center = this.map.getView().getCenter();
      this.showDialog({
        lonLat: center,
        dialogSize: [400, 400]
      });

    },
    startDraw() {
      // this.drawer = this.draw({
      //   layer: this.drawVector,
      //   type: this.drawType
      // });
      
    },
    showDialog(option) {
      this.dialog = this.createOverLayer(this.$refs.dialog, [- option.dialogSize[0] / 2, - option.dialogSize[1]]);
      this.dialog.setPosition(option.lonLat);
      this.showPoint(
        {
          layer: this.iconLayer,
          item: {
            lonLat: option.lonLat,
            text: '111'
          },
          style(feature) {
            return {
              icon: startIcon,
              text: feature.getProperties().text
            };
          }
        }
      );
      this.setMapCenter({lonLat: option.lonLat, offset: [0, option.dialogSize[1] / 2]});
    },
    closeDialog() {
      this.dialog.setPosition(null);
    },
    /**
     * 添加鼠标点击事件
     * */
    addMouseEvent() {
      // 添加鼠标点击事件
      this.mapObj.on('click', (evt) => this.mapClick(evt));
      // 添加鼠标经过事件
      this.mapObj.on('pointermove', (evt) => this.mapPointerMove(evt));
      //
      this.mapObj.on('moveend', (evt) => this.mapZoomChange(evt));
    },
    /**
     * 地图点击
     */
    mapClick(evt) {
      this.clickCenter = evt.coordinate; // 获取点击的中心点
    },
    /**
     * 鼠标划过地图事件
     */
    mapPointerMove(evt) {
      this.clickCenter = evt.coordinate; // 获取划过的中心点
      if (evt.dragging) {
        return false;
      }
    },
    /**
     * 地图缩放事件
     */
    mapZoomChange() {
      this.zoom = this.mapObj.getView().getZoom(); // 获取地图层级
    },
    /**
     * 移动地图
     */
    mapMove(evt) {
      this.mapObj.getView().animate({
        // center: evt.coordinate
        center: [120.000000, 24.00000]
      });
    }
  }
};
</script>

<style scoped lang="less">
#hmap {
  height: 1000px;
  width: 800px;
  margin: 0px;
  padding: 0px;
}
</style>