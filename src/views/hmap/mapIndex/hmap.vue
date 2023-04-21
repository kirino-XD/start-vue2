<template>
  <div>
    <div 
      id="map" 
      class="map"
    />
    <div class="hover-center">
      {{ clickCenter }} {{ zoom }}
    </div>
    <div class="button-menu">
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
      <el-button @click="drawCircleFun()">
        画圆形
      </el-button>
      <el-button @click="drawRectFun()">
        画矩形
      </el-button>
      <el-button @click="drawPolygonFun()">
        画多边形
      </el-button>
      <el-button @click="getShareImgBase64()">
        截图
      </el-button>
    </div>
  </div>
</template>
  
<script>
import 'ol';
import HMap from './hmap.js';
import './hmap.css';
import {mapCommonMixin} from '../map-mixin/map-common-mixin';

import icon from '../../../assets/images/icon.png';
import startIcon from '../../../assets/images/start.png';
import endIcon from '../../../assets/images/end.png';
import t from '../../../assets/images/t.json';

import html2canvas from 'html2canvas';
export default {
  name: 'Hmap',
  mixins: [mapCommonMixin],
  data() {
    return {
      metadata: [],
      html2canvas: null,
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
    // init() {
    //   this.mapBase(() => {
    //     // 添加地图事件
    //     this.initMap();
    //     // this.addXYZLayer();
    //     // this.initLayers();

    //     // this.addEvent(this.mapObj);
    //     this.addMouseEvent(); // 鼠标点击事件
    //     this.addPointAttributes(); // 地图打点
    //     this.controlScaleLineFun(); // 鹰眼图
        
    //     // this.clickLayer = this.getVectorLayer({
    //     //   icon: null,
    //     //   anchor: [0.5, 1]
    //     // });
    //     console.log('this.mapObj', this.mapObj);
    //     // this.addMapEventListener('mapClick', (data, lonLat)=>{
    //     //   console.log(lonLat);
    //     //   // this.clearLayer(this.clickLayer);
    //     //   // this.showPoint(
    //     //   //   {
    //     //   //     layer: this.clickLayer,
    //     //   //     item: {
    //     //   //       lon: lonLat[0],
    //     //   //       lat: lonLat[1],
    //     //   //     },
    //     //   //   }
    //     //   // );
    //     // });
    //   });
    // },
    // initMap() {
    //   this.mapObj = new HMap('map', {
    //     view: {
    //       // 都匀市中心
    //       // center: [107.52, 26.26],
    //       center: [118.12, 24.4869],
    //       projection: 'EPSG:3857',
    //       zoom: 5, // resolution
    //     },
    //   });
    // },
    mapBase(callback) {
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

    addWmtsLayer() {
      let wmtsLayer = this.mapObj.createWMTSLayer('WMTS', {
        layerName: 'tianditu',
        isDefault: true,
        layerType: 'TileWMTS',
        projection: 'EPSG:4326',
        levels: 19,
        layer: 'vec',
        format: 'tiles',
        matrixSet: 'c',
        layerUrl: 'https://52.52.3.6/hmappublish/service/rs/v1/raster_tile/tms/test_84',
        create: true
      });
      this.mapObj.addLayer(wmtsLayer);
    },

    addXYZLayer() {
      var xyzLayer = this.mapObj.createXYZLayer ('XYZ', {
        create: true,
        layerName: 'XYZ',
        layerUrl: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Em2forfI5ZPT8NaJic3f'
      });
      this.mapObj.addLayer(xyzLayer);
    },
    
    // initLayers() {
    //   this.polygonLayer = this.getVectorLayer();
    //   this.showPolygon({
    //     layer: this.polygonLayer,
    //     text: [''],
    //     list: [
    //       t
    //     ]
    //   });
    //   this.iconLayer = this.getVectorLayer({icon: icon});
    //   this.createSelect(
    //     {
    //       layers: [this.iconLayer],
    //       callback(e) {
    //         console.log(e);
    //       },
    //       style(feature) {
    //         return {
    //           icon: startIcon,
    //           text: feature.getProperties().text
    //         };
    //       }
    //     },
    //   );
    //   this.showPoint(
    //     {
    //       layer: this.iconLayer,
    //       item: {
    //         lon: 118.085,
    //         lat: 24.457,
    //         text: '111'
    //       },
    //       style(feature) {
    //         return {
    //           icon: startIcon,
    //           text: feature.getProperties().text
    //         };
    //       }
    //     }
    //   );

    //   this.iconLayerEnd = this.getVectorLayer(
    //     function (feature) {
    //       return {
    //         icon: endIcon,
    //         text: feature.getProperties().text
    //       };
    //     }
    //   );
    //   this.createSelect({
    //     style(feature) {
    //       return {
    //         icon: icon,
    //         text: feature.getProperties().text
    //       };
    //     },
    //     layers: [this.iconLayerEnd],
    //     callback(feature, info) {
    //       console.log(feature, info);
    //     }
    //   });
    //   this.showPoints({
    //     layer: this.iconLayerEnd,
    //     list: [
    //       {
    //         lonLat: [118.15364562988282, 24.507671026611323],
    //         text: '100'
    //       },
    //       {
    //         lonLat: [118.14368927001954, 24.456172613525386],
    //         text: '222'
    //       },
    //     ],
    //     style(feature) {
    //       return {
    //         icon: startIcon,
    //         text: feature.getProperties().text
    //       };
    //     },
    //   });


    //   let clusterList = [
    //     {
    //       lonLat: [118.18935119628907, 24.503551153564448],
    //       text: '100'
    //     },
    //     {
    //       lonLat: [118.19278442382813, 24.482951788330073],
    //       text: '222'
    //     },

    //   ];
    //   let clusterLayer = this.getClusterLayer((feature)=> {
    //     return {
    //       icon: icon,
    //       color: '#3399CC',
    //       text: feature.get('features')[0].getProperties().text
    //     };
    //   });
    //   this.showClusterPoints({layer: clusterLayer, list: clusterList});
    //   this.createSelect({
    //     style: (feature)=> {
    //       return {
    //         icon: startIcon,
    //         color: 'orange',
    //         text: feature.get('features')[0].getProperties().text
    //       };
    //     },
    //     isCluster: true,
    //     layers: [clusterLayer],
    //     callback(feature, info) {
    //       console.log(feature, info);
    //       // console.log(feature.get('features'));
    //       // if(feature.)
    //       // console.log(feature, info);
    //     }
    //   });
    //   this.lineLayer = this.getVectorLayer();
    //   this.drawLine([
    //     [118.2266017150879, 24.560886053466792],
    //     [118.24514114379883, 24.439006475830073],
    //     [118.16205703735352, 24.402270941162104]
    //   ], this.lineLayer);
    //   this.drawVector = this.getVectorLayer();
    // },

    controlScaleLineFun() {
      // 鹰眼图
      let controlScaleLine = new ol.control.ScaleLineH({
        minWidth: 64,
        units: 'metric_cn'
      });
      this.mapObj.addControl(controlScaleLine);
    },
    
    addPointAttributes() {
      // 点要素
      let points = [
        {
          'attributes': {
            'OBJECTID': '45',
            'ID': '{393C392E-17FE-46EF-B39B-91433EB01AB6}',
            'XZQHMC': '于都县'
          },
          'geometry': 'POINT (107.52 26.26)',
          'geometryType': 'Point'
        },
        {
          'attributes': {
            'OBJECTID': '46',
            'ID': '{393C392E-17FE-46EF-B39B-91433EB01AB7}',
            'XZQHMC': '于都县'
          },
          'geometry': 'POINT (107.52 26.26)',
          'geometryType': 'Point'
        }
      ];
      let _points = points.map(function (item, index) {
        item['attributes']['style'] = {
          image: {
            type: 'icon',
            image: {
              imageSrc: './assets/images/point1.png',
              imageAnchor: [0.5, 1]
            }
          },
          text: {
            text: (index + 1).toString(),
            textFont: 'normal normal 100 12px ArialMT',
            textOffsetX: 3,
            textOffsetY: -15,
            textOverflow: true,
            textFill: {
              fillColor: '#FFF'
            },
            textStroke: {
              strokeColor: '#FFF'
            }
          },
          zIndex: index
        };
        item['attributes']['selectStyle'] = {
          image: {
            type: 'icon',
            image: {
              imageSrc: '../../../assets/images/point1.png',
              imageAnchor: [0.5, 1]
            }
          },
          text: {
            text: (index + 1).toString(),
            textFont: 'normal normal 100 12px ArialMT',
            textOverflow: true,
            textOffsetX: 3,
            textOffsetY: -15,
            textFill: {
              fillColor: '#FFF'
            },
            textStroke: {
              strokeColor: '#FFF'
            }
          },
          zIndex: index
        };
        return item;
      });
      this.mapObj.addPoints(_points, {
        layerName: 'points',
        zoomToExtent: true,
        selectable: true,
        moveable: true,
        style: {
          image: {
            type: 'icon',
            image: {
              imageSrc: '../../../assets/images/point2.png',
              imageAnchor: [0.5, 1]
            }
          }
        }
      });
    },
    
    // getVectorLayer() {
    //   let vector = new ol.layer.Vector({
    //     source: new ol.source.Vector({
    //       url: 'https://openlayers.org/en/v4.4.1/examples/data/geojson/countries.geojson',
    //       format: new ol.format.GeoJSON()
    //     })
    //   });
    //   console.log('vector', vector);
    //   return vector;
    // },

    // 画圆形
    drawCircleFun() {
      this.drawer = this.getVectorLayer();
      let draw = new ol.interaction.Draw({
        source: this.drawer.getSource(),
        type: 'Circle'
      });
      this.mapObj.addInteraction(draw);
    },
    // 画矩形
    drawRectFun() {
      this.drawer = this.getVectorLayer();
      let draw = new ol.interaction.Draw({
        source: this.drawer.getSource(),
        type: 'MultiPolygon'
      });
      this.mapObj.addInteraction(draw);
    },
    // 画多边形
    drawPolygonFun() {
      this.drawer = this.getVectorLayer();
      let draw = new ol.interaction.Draw({
        source: this.drawer.getSource(),
        type: 'Polygon'
      });
      this.mapObj.addInteraction(draw);
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
    },
    
    showDialogBtn() {
      let center = this.map.getView().getCenter();
      this.showDialog({
        lonLat: center,
        dialogSize: [400, 400]
      });

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
    startDraw() {
      console.log('111', this.drawVector, this.drawType);
      this.drawer = this.draw({
        layer: this.drawVector,
        type: this.drawType
      });
    },

    // 获取分享图片 base64
    getShareImgBase64() {
      return new Promise((resolve) => {
        setTimeout(() => {
          // #capture 就是我们要获取截图对应的 DOM 元素选择器
          html2canvas(document.querySelector('.map'), {
            useCORS: true, // 【重要】开启跨域配置
            scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
            allowTaint: true, // 允许跨域图片
          }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            resolve(imgData);
          });
        }, 300); // 这里加上 300ms 的延迟是为了让 DOM 元素完全渲染完成后再进行图片的生成
      });
    },

    init() {
      let metadataUrl = 'https://52.52.3.6/hmappublish/service/rs/v1/raster_tile/tms/test_84';

      let opts = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
      };
      fetch(metadataUrl, opts)
        .then(res => {
          return res.json();
        })
        .then(json => {
          if (json.code === '0') {
            // 获取元数据信息
            this.metadata = json.data;
            console.log('this.metadata', this.metadata);
            this.initMap();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    initMap() {
      const center = new hmap.basetype.Coordinate(...this.metadata.center);
      const resolutions = this.metadata.resolutions.map(item => item * 1);
      const minLevel = this.metadata.minLevel * 1;
      const maxLevel = this.metadata.maxLevel * 1;
      const zoom = Math.ceil((maxLevel + minLevel) / 2);
      const mapOptions = {
        maxLevel: maxLevel,
        minLevel: minLevel,
        resolutions: resolutions,
        zoom: zoom,
        crs: new hmap.proj.Crs(this.metadata.srid),
        center: center,
      };
      this.mapObj = new hmap.Map('hmap', mapOptions, initLayers);
      console.log('-->this.mapObj', this.mapObj);
    },

    initLayers() {
      // initControl(map);
      // 元数据里拿到服务地址、切片原点和切片大小
      const serviceUrl = 'https://52.52.3.6/hmappublish/service/rs/v1/raster_tile/tms/test_84';
      const originX = this.metadata.origin[0] * 1;
      const originY = this.metadata.origin[1] * 1;
      const imgSize = this.metadata.imgSize || 256;

      // 添加TMS图层
      const tileLayer = new hmap.layer.TMSLayer('tms', serviceUrl, {
        matrixOrigin: new hmap.basetype.Coordinate(originX, originY),
        dataFormat: this.metadata.imgType,
        gridSize: new hmap.basetype.Size(imgSize, imgSize),
        isRTE: true
      });
      this.mapObj.addLayer(tileLayer);
      console.log('-->this.initLayers', this.mapObj);
    }
  }
};
</script>

<style type="text/css">
  html, body, #map {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .hover-center{
    position: absolute;
    top: 0;
    left: 0;
  }
  .button-menu{
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
