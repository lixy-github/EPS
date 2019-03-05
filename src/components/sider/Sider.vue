<template>
    <div class="sider-logo">
        <!-- logo -->
        <div class="logo">
            <div v-if="!isCollapsed" class="logo-bg">
                <div class="logo-title">易品速物联网平台</div>
            </div>
            <div v-if="isCollapsed" class="logo-min">
                <img src="../../../static/img/logo.png">
            </div>
        </div>

        <!-- 侧边栏展开 -->
        <Menu 
            v-show="!isCollapsed"
            :active-name="activeName" 
            :open-names="opennames"
            accordion
            theme="dark" 
            ref="side_head"
            width="auto" 
            @on-select="jump">

            <template v-for="menu in menu_list">
                <MenuItem v-if="!menu.children" :name="menu.path" :key="menu.id">
                    <Icon :type="menu.icon" :key="menu.id"></Icon>
                    <span class="layout-text" :key="menu.id">{{ menu.title }}</span>
                </MenuItem>
                <Submenu v-if="menu.children && menu.children.length" :name="menu.path" :key="menu.id">
                    <template slot="title">
                        <Icon :type="menu.icon" :key="menu.id" calss="top-icon"></Icon>
                        <span class="layout-text" :key="menu.id">{{ menu.title }}</span>
                    </template>
                    <template v-for="child in menu.children">
                        <MenuItem :name="child.path" :key="child.id">
                            <span class="layout-text" :key="child.id">{{ child.name }}</span>
                        </MenuItem>
                        <!-- 三级菜单 -->
                        <Submenu v-if="child.children && child.children.length" :name="child.path" :key="child.id" style="margin-top:-30px;">
                            <template slot="title">
                                <span class="layout-text">{{ child.title }}</span>
                            </template>
                            <template v-for="son in child.children" style="display:flot">
                                <MenuItem :name="son.path" :key="son.id">
                                    <span class="layout-text" :key="son.id">{{ son.name }}</span>
                                </MenuItem>
                            </template>
                        </Submenu>
                    </template>
                </Submenu>
            </template>
        </Menu>

        <!-- 侧边栏 收缩 -->
        <Menu
            v-show="isCollapsed"
            theme="dark"
            width="auto">

            <template v-for="menu in menu_list">
                <Tooltip v-if="!menu.children" :key="menu.id" transfer placement="right">
                    <router-link :to="menu.path">
                        <Icon :type="menu.icon" :key="menu.id" size="23"></Icon>
                    </router-link>
                    <div slot="content">{{ menu.title }}</div>
                </Tooltip>    
                <template v-if="menu.children && menu.children.length">
                    <Dropdown class="dropdown-list" @on-click="jump" transfer placement="right" trigger="click" :key="menu.id">
                        <a href="javascript:void(0)">
                            <Icon :type="menu.icon" size="23"></Icon>
                        </a>
                        <DropdownMenu slot="list" v-for="child in menu.children" :key="child.id">
                            <DropdownItem :selected="activeName == child.path ? true :false" :name="child.path">{{ child.name }} </DropdownItem>
                            <!-- 第三级 -->
                            <Dropdown v-if="child.children && child.children.length" :key="child.id" transfer placement="right-start" class="remove-brother">
                                <DropdownItem :selected="activeName.substr(0, activeName.lastIndexOf('/')) == child.path ? true : false">
                                    {{ child.title }}
                                    <Icon type="ios-arrow-forward" size="23"></Icon>
                                </DropdownItem>
                                <DropdownMenu slot="list" v-for="son in child.children" :key="son.id">
                                    <DropdownItem :selected="activeName == son.path ? true : false" :name="son.path">{{ son.name }}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </DropdownMenu>
                    </Dropdown>
                </template>
            </template>    
        </Menu>
    </div>
</template>
<script>
import siderData from '../../../static/siderData/sider.js'

export default {
    props: {
        activeName: String,
        opennames: Array,
        isCollapsed: Boolean
    },
    data() {
        return {
            menu_list: []
        }
    },
    methods: {
        jump(path) {
            if (path) {
                this.$router.push(path);
            }
        }
    },
    mounted() {
        this.menu_list = siderData;
    },
    updated() {
        this.$nextTick(() => {
            if(this.$refs.side_head){
                this.$refs.side_head.updateOpened();
                this.$refs.side_head.updateActiveName();
            }
        });
        $(".remove-brother").siblings(".ivu-dropdown-item").remove();
    }
}
</script>
<style>
.sider-logo {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.sider-logo .logo {
    height: 80px;
    text-align: center;
    line-height: 80px;
}
.sider-logo .logo-bg {
    width: 100%;
    height: 100%;
    /* background: url('../../../static/img/logo.png') no-repeat 50%;
    background-size: 75% 54%;  */
}
.sider-logo .logo-bg .logo-title {
    color: #fff;
    font-size: 19px;
}
.sider-logo .logo-min {
    width: 100%;
    text-align: center;
    padding-top: 15px;
}
.sider-logo .logo-min img{
    width: 35px;
    height: 35px;
}
.ivu-layout-has-sider .ivu-layout-sider {
    background: #001529;
}
.ivu-menu.ivu-menu-dark {
    background: #001529;
}
.vertical-item .top-icon{
    display: block;
    position:relative;
    top: 15px;
    font-size: 20px;
}
.ivu-menu .dropdown-list,
.ivu-menu .ivu-tooltip {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.dropdown-list .ivu-icon,
.ivu-tooltip .ivu-icon {
    color: #fff;
}
#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), 
#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, 
#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), 
#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover,
#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title,
#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened,
#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, 
#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background: transparent;
}
</style>
