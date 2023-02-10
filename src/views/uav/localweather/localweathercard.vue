<template>
  <div>
    <div>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple" />
          <el-card class="box-card1">
            <div class="subbox-card1" ref="boxcard1">
              <div class="card1header" ref="card1header">
                <span>当前天气<br></span>
                <span>666&nbsp;&nbsp;&nbsp;</span>
                <span>11:20</span>
              </div>
              <div>
                <div class="card1maincontent">
                  <div style="font-size:3vh;margin:3px 15px;">20°C</div>
                  <div style="margin:3px 10px;">
                  </div>
                </div>
              </div>
              <div class="card1bottom">
                <div><span>风速</span><br><span>1.2</span></div>
                <div><span>风向</span><br><span>N</span></div>
                <div><span>雨量</span><br><span>111</span></div>
                <div><span>湿度</span><br><span>222</span></div>
                <div><span>光照强度</span><br><span>20</span></div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "localweathercard"
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.box-card1{
  width: 520px;
  margin: 0;
  padding: 0;
  background:rgba(84, 172, 84, 0.8);

}
.card1header{
  margin-left: 20px;
}
.box-card2{
  width: 100%;
}
.el-card :deep .el-card__body {
  padding: 0px;
}
.subbox-card2, .subbox-card1{
  width: 100%;
  height: 100%;
  padding: 20px 0 0 15px;
}
.card1maincontent{
  display: flex;
  margin: 5px 5px 5px 5px;
  /* flex-grow: 1; */
}
.card1bottom{
  display: flex;
  width: 100%;
  justify-content:space-around;
  margin: 0;
  padding: 0;
}
li{
  list-style-type: none;
}
/* .card1bottomul{
    float: left;
} */

ul li{
  float: left;
  margin: 5px 10px;
}
span{
  font-size: 2.3vh;
}
</style>
