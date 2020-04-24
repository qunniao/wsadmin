<!-- 菜单递归 -->
<template>
    <!-- 有子节点 -->
    <el-submenu v-if="menuItem.children && menuItem.children.length" :index="menuIndex + ''"  >
        <template slot="title">
            <i v-if="menuItem.icon" :class="menuItem.icon"></i>
            <span>
              <el-checkbox-group v-model="checkList"  >
              <el-checkbox :label="menuItem.actionId" :key="menuItem.actionId" @change="changeAction">{{menuItem.actionName}}</el-checkbox>
              </el-checkbox-group>
              </span>
        </template>
        <action-item v-for="item in menuItem.children" :key="item.actionId + ''" :menuItem="item" :menuIndex="item.actionId" :checkList="checkList" v-on:listenTochildEvent="showMessageFromChild"> </action-item>
    </el-submenu>
    <!-- 没有子节点 -->
    <el-menu-item v-else :index="menuIndex + ''">
        <i v-if="menuItem.icon" :class="menuItem.icon"></i>
        <el-checkbox-group v-model="checkList"  >
        <el-checkbox :label="menuItem.actionId" :key="menuItem.actionId" @change="changeAction">{{menuItem.actionName}}</el-checkbox>
        </el-checkbox-group>
    </el-menu-item>

</template>

<script>
export default {
  name:'actionItem',
  data(){
    return {
     
    };
  },
  props: {
    menuItem: {
        required: true,
        type: Object,
    },
    menuIndex: {
        required: true,
    },
    checkList: {
        required: true,
    },
  },

  methods: {
     changeAction(){
            this.$emit("listenTochildEvent",this.checkList);
          },
    showMessageFromChild(data){
          this.checkList = data;
          this.$emit("listenTochildEvent",this.checkList);
    },
          
  }
 
}

</script>

<style scoped>

</style>