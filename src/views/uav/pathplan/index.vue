<template>
  <el-container>
    <el-aside width="160px">

      <div class="selectuav">
        <el-divider></el-divider>
        <el-tag class="ml-2" type="info">选择机库和飞机：</el-tag>
      </div>

<!--      机库下拉选项-->
      <div class="selectuav">
        <el-select v-model="uavHangar" placeholder="机库">
          <el-option
            v-for="item in uavHangarOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </div>

<!--      飞机下拉选项-->
      <div class="selectuav">
        <el-select v-model="uavIDValue" placeholder="飞机">
          <el-option
            v-for="item in uavIDOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </div>

      <div class="selectuav">
        <el-divider></el-divider>
         <el-tag class="ml-2" type="info">请选择操作：</el-tag>
      </div>

      <div class="buttonuav">
        <el-button type="success" @click="clickOnSetFlightPosition">选择地点</el-button>
      </div>
      <div class="buttonuav">
        <el-button type="success" @click="clickOnClearSelect">取消选择</el-button>
      </div>
      <div class="buttonuav">
        <el-button type="success" @click="clickOnPlanFlightPosition">规划路线</el-button>
      </div>
      <div class="buttonuav">
        <el-button type="success" @click="clickOnClearFlight">重选路线</el-button>
      </div>
      <div class="buttonuav">
        <el-button type="success" @click="clickOnGetFlightPositionNow">实时坐标</el-button>
      </div>
      <div class="buttonuav">
        <el-button type="success" @click="clickOnClearFlightPositionNow">清空实时</el-button>
      </div>
      <div class="buttonuav">
        <el-button type="success" @click="isShowDrone = !isShowDrone">飞机直播</el-button>
      </div>
      <div class="buttonuav">
        <el-button type="success" @click="isShowHangar = !isShowHangar">机舱直播</el-button>
      </div>
      <div class="buttonuav">
        <el-button type="success" @click="clickOnStopGetFlightNow">停止获取</el-button>
      </div>
      <div class="buttonuav">
        <el-button
          type="success"
          @mouseenter="isShowWeather = !isShowWeather"
          @mouseleave="isShowWeather = !isShowWeather">
          实时天气
        </el-button>
      </div>
      <div class="buttonuav">
        <el-button type="success" @click="isShowPic = !isShowPic">显示照片</el-button>
      </div>
    </el-aside>

    <el-main>
      <div id="container" style="height: 550px; width: 100%; position: relative">
<!--        <div class="playVedio" v-if="isShowDrone">-->
<!--          <Index/>-->
<!--        </div>-->
        <div class="localweatehr" v-show="isShowWeather">
          <Localweathercard/>
        </div>
      </div>
<!--      <div class="cameramonitor" v-show="isShowHangar">-->
<!--        <cameraIndex/>-->
<!--      </div>-->
    </el-main>

  </el-container>
</template>

<script lang="ts">

import {onMounted, reactive, ref} from "vue";
import Localweathercard from "@/views/uav/localweather/localweathercard.vue";
import AMapLoader from '@amap/amap-jsapi-loader';
import {addUavPath, getUavLocation} from "@/api/uav/pathplan";
import {ElMessage} from "element-plus";
import defaultSettings from "@/settings";

const { AMapKey } = defaultSettings;

export default {
  name: 'APP',
  components:{
    Localweathercard
  },

  setup(){

    let map: any;
    let isShowWeather = ref(false);
    let flightDataForm= reactive(new FormData());
    let marker: any[] = []; // 点标记对象数组
    let flightPath: any[] = reactive([]); // 折线转折点的位置,对象数组
    let uavIDValue = ref("001");
    let uavHangar = ref("001");
    let polyLines = ref(null); // 一次性产出多个折线的数组
    let flightPlanCount = ref(0); // 点标记坐标位置,路线规划点击次数
    let time1: number; // 查询实时轨迹的定时器
    let droneIcon = reactive(Object);
    let arrayLengthNow = 0; // 当前数组的长度
    let arrayLengthLast = 0; // 上一次数组的长度
    const uavHangarOptions = [{value: "001",label: "机库1", disabled: false},
                              {value: "002",label: "机库2", disabled: false},
                              {value: "003",label: "机库3", disabled: false},
                              {value: "004",label: "机库4", disabled: false},
                              {value: "005",label: "机库5", disabled: false},];
    const uavIDOptions = [{value: "001",label: "飞机1", disabled: false},
                          {value: "002",label: "飞机2", disabled: false},
                          {value: "003",label: "飞机3", disabled: false},];
    // (1)初始化地图
    const initMap = () => {
      AMapLoader.load({
        key: AMapKey,
        version: "2.0",
        plugins: [
          "AMap.MouseTool",
          "AMap.PolylineEditor",
          "AMap.ElasticMarker",
          "AMap.Scale",
          "AMap.HawkEye",
          "AMap.MapType",
          "AMap.Geolocation",
          "AMap.HawkEye",
          "AMap.ToolBar",
          "AMap.ControlBar",
        ],
        Loca: {
          version: "2.0",
        },
      }).then((AMap: any) => {
        map = new AMap.Map("container", {
          viewMode: "3D",  //最普通的图层设置，不显示细节的东西
          resizeEnable: true, //是否监控地图容器尺寸变化
          zooms: [4, 18],
          zoom: 18,  //初始地图层级级别
          // rotation: -100,//地图水平旋转
          pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
          center: [120.396987, 30.360537], //海宁高新科创中心
          layers: [
            new AMap.TileLayer.Satellite(),
            new AMap.TileLayer.RoadNet(),
          ],
        });

        droneIcon = new AMap.Icon({
          size: new AMap.Size(36, 36),
          image: "src/views/uav/pathplan/img/drone.png",
          imageOffset: new AMap.Pixel(0, -10), // 图像相对展示区域的偏移量，适于雪碧图等，前一个左右偏移，第二个上下偏移，相对于position中心点位置，默认是marker的左上角
          imageSize: new AMap.Size(30, 40), // 根据所设置的大小拉伸或压缩图片
        });

        // 在图面添加工具条控件实现缩放
        let toolBar = new AMap.ToolBar({ position: {top: "70px",right: "200px", }, visible: true,});

        //添加工具条方向盘控件
        let ControlBar = new AMap.ControlBar({ position: {top: "50px",right: "10px",}, visible: true,});

        map.addControl(toolBar);  // 在图面添加工具条控件实现地图缩放
        map.addControl(ControlBar);  // 右上角最右边的圆形控制盘
        map.addControl(new AMap.Scale({ visible: true }));  // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺 左下角
        map.addControl(new AMap.HawkEye({visible: true,}));  // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        map.addControl(new AMap.MapType({position: {top: "50px", right: "100px",},})); // 实现默认图层与卫星图、交通图层之间切换

        let trafficLayer = new AMap.TileLayer.Traffic({zIndex: 10,});  // 实时路况图层
        map.add(trafficLayer); //添加图层到地图

      }).catch((e) => {console.log(e);});
    };

    // (2)点击设置航线(选择地点)
    const clickOnSetFlightPosition = () => {
      if(map !== null){
        map.on("click", showInfoClick);  // 地图的点击事件绑定到showInfoClick函数上
      }
      clickOnClearFlightPositionNow();  // 开始设置航线前，清空marker、flightPath等数据
      clickOnStopGetFlightNow();  // 停止获取实时航线 也就是停止定时器的调用
    };

    // (3)鼠标移动点击和双击事件获取坐标信息
    const showInfoClick = (e: any) => {
      let pos = new AMap.LngLat(e.lnglat.getLng(), e.lnglat.getLat());

      // 转化为json格式数据发送给后端
      let longitude = <string> e.lnglat.getLng();
      flightDataForm.append("longitude", longitude);
      flightDataForm.append("latitude", e.lnglat.getLat());

      marker.push(new AMap.Marker({position: pos, icon: droneIcon}));
      map.add(marker);
      flightPath.push(pos);  // 添加折线的转折点坐标到数组对象中
    };

    // (4)点击取消选择
    const clickOnClearSelect = () => {
      if (map !== null) {
        map.off("click", showInfoClick);  // 解绑点击事件
      }
    };

    // (5)点击规划路线
    const clickOnPlanFlightPosition = () => {
      flightDataForm.append("uavID", uavIDValue.value);  // 存入当前的飞机ID
      addUavPath(flightDataForm).then(function (response: any) {
        if (response.data) {
          ElMessage({message: "成功提交", type: "success",});
        } else {
          ElMessage({message: response.errmsg, type: "error",});
        }
      }).catch((err) => console.log(err));

      map.remove(polyLines); //删除原来的折线
      polyLines = new AMap.Polyline({
        path: flightPath, // 折线转折点坐标
        isOutline: true, // 是否描边
        outlineColor: "#ffeeff", // 描边颜色
        borderWeight: 3, // 描边宽度
        strokeColor: "#00BB00", // 主线颜色
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeStyle: "solid",
        strokeDasharray: [10, 5],
        lineJoin: "round",  // 折线拐点连接处样式
        lineCap: "round",
        zIndex: 50,
      });

      map.add(polyLines);  // 添加折线到地图
      flightPlanCount.value++;
      flightDataForm = new FormData();  // 清空formData的数据
    };

    //(6)重新设置航线
    const clickOnClearFlight = () => {
      map.remove(marker);  // 删除点标记的图像
      map.remove(polyLines);  // 删除折线
      // splice(index,howmany) ——> 删除从index位置开始的数，howmany为删除的个数
      marker.splice(0, marker.length); // 删除maker数组中的数据，防止下次选择点时上次选择的错误点还存在
      flightPath.splice(0, flightPath.length);
      flightPlanCount.value = 0; // 重新给折线数组元素个数赋值
      flightDataForm = new FormData();  // 清空formData的数据
    };

    //(7)获取航行轨迹
    const clickOnGetFlightPositionNow = () => {
      // setInterval(function, interval);  按时间间隔不断地调用一个函数
      // 其中function参数是要被周期性执行的函数，interval参数单位是毫秒，表示多长时间执行一次function函数。
      time1 = setInterval(() => {
        AddFlightPositionNow();
      }, 5000);
    };

    //(8)将获取的当前航线显示到前端
    const AddFlightPositionNow = async () => {
      // 同步一下起飞的uavid和要查询的uavid
      await getUavLocation(uavIDValue.value).then((res) => {
        let lnglattmp: any = res;
        arrayLengthNow = lnglattmp.length;
        for (let i = arrayLengthLast; i < arrayLengthNow; i++) {
          let lnglatarray = lnglattmp[i].split(",");
          addMark(lnglatarray[0], lnglatarray[1].substring(0, lnglatarray[1].length - 1));
        }
        arrayLengthLast = arrayLengthNow;
      }).catch((err) => console.log(err));
    };

    const addMark = (lng: any, lat: any) => {
      marker.push(
        new AMap.Marker({
          position: new AMap.LngLat(lng, lat),
          icon: droneIcon,
          offset: new AMap.Pixel(-20, -60), // 设置点标记偏移量
        })
      );
      map.add(marker);
    };

    //(9)清空当前的实时航线
    const clickOnClearFlightPositionNow = () => {
      arrayLengthLast = 0;
      arrayLengthNow = 0;
      map.remove(marker); // 删除点标记的图像
      map.remove(polyLines); // 删除折线
      // splice(index,howmany) ——> 删除从index位置开始的数，howmany为删除的个数
      marker.splice(0, marker.length); // 删除maker数组中的数据，防止下次选择点时上次选择的错误点还存在
      flightPath.splice(0, flightPath.length);
    };

    //(10)停止获取实时航线,但不清空点标记和经纬度数组
    const clickOnStopGetFlightNow = () => {
      clearInterval(time1);
    };

    onMounted(() => {
      initMap();
    });

    return{
      map,
      uavHangar,
      isShowWeather,
      uavHangarOptions,
      uavIDValue,
      droneIcon,
      uavIDOptions,
      clickOnSetFlightPosition,
      clickOnPlanFlightPosition,
      clickOnClearSelect,
      clickOnClearFlight,
      clickOnGetFlightPositionNow,
      AddFlightPositionNow,
      clickOnClearFlightPositionNow,
      clickOnStopGetFlightNow,
      marker
    };
  },
};
</script>

<style lang="scss" scoped>

.selectuav {
  margin: 20px;
}

.buttonuav {
  margin: 20px;
}

.playVedio {
  position: absolute;
  bottom: 0;
  width: 300px;
  height: 300px;
  z-index: 1;
}

.cameramonitor {
  display: flex;
  width: 300px;
  height: 300px;
}


.localweatehr {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
}
</style>

