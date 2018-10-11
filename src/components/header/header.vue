<template>
    <div>
        <div class="header clearfix">
            <!-- 左侧 -->
            <div class="header-left lt">
                <div class="logo"></div>
                <span class="head-title">易品速物联网平台</span>
                <div class="select-dropdown">
                    <Dropdown>
                        <a href="javascript:void(0)">
                            <i class="dropdown-icon"></i>
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>驴打滚</DropdownItem>
                            <DropdownItem>炸酱面</DropdownItem>
                            <DropdownItem>豆汁儿</DropdownItem>
                            <DropdownItem>冰糖葫芦</DropdownItem>
                            <DropdownItem>北京烤鸭</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="head-search">
                    <Input search placeholder="搜索..." />
                </div>
            </div>

            <!-- 最右侧 -->
            <div class="head-right rt">
                <Avatar icon="ios-person" />
                <span class="btn-icon fa fa-cog"></span>
                <span class="btn-icon fa fa-power-off"></span>
            </div>

            <!-- 导航菜单 -->
            <Menu 
                mode="horizontal" 
                theme="light" 
                :active-name="activeName"
                @on-select="jump"
                ref="side_head"
                class="rt">

                <template v-for="menu in menuList">
                    <MenuItem :name="menu.path" v-if="!menu.children"  :key="menu.id">
                        <i :class="menu.icon" :key="menu.id"></i>
                        <span class="layout-text" :key="menu.id">{{menu.title}}</span>
                    </MenuItem>
                    <Submenu v-if="menu.children && menu.children.length>=1" :name="menu.path" :key="menu.id">
                        <template slot="title">
                            <i :class="menu.icon"></i>
                            <span class="layout-text">{{ menu.title }}</span>
                        </template>
                        <template v-for="child in menu.children">
                            <MenuItem :name="child.path" :key="child.id">
                                <span class="layout-text" :key="child.id">{{ child.name }}</span>
                            </MenuItem>
                        </template>
                    </Submenu>
                </template>
            </Menu>
        </div>
    </div>
</template>
<script>
export default {
    
    data () {
        return {
            menuList: []
        }
    },
    props: {
        activeName: {
            type: String
        }
    },
    methods: {
        jump(name) {
            this.$router.push(name)
        }
    },
    mounted() {
        this.axios.get(process.env.API_HOST+"static/headerData/header.json").then(res=>{
            this.menuList = res.data;
        })
    },
    updated() {
        this.$nextTick(() => {
            if(this.$refs.side_head){
                this.$refs.side_head.updateOpened();
                this.$refs.side_head.updateActiveName();
            }
        })
    }
}
</script>
<style>
.header .ivu-menu-horizontal.ivu-menu-light:after {
    display: none;
}
.header-left .logo {
    display: inline-block;
    margin-top: 8px;
    width: 60px;
    height: 44px;
    background: url("../../../static/img/logo.png") no-repeat;
    background-size: 70% 100%;
}
.header-left .head-title {
    display: inline-block;
    height: 70px;
    line-height: 70px;
    vertical-align: top;
    color: #333;
    font-size: 18px;
    margin: -5px 40px 0 -10px;
}
.select-dropdown {
    display: inline-block;
    vertical-align: top;
    margin-top: -2px;
    position: relative;
}
.select-dropdown:before {
    position: absolute;
    left: -20px;
    top: 22px;
    content: "";
    display: block;
    height: 24px;
    border-left: 1px solid #ebedee;
}
.select-dropdown a {
    color: #515a6e;
}
.select-dropdown .dropdown-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url("../../../static/img/application.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
}
.select-dropdown .ivu-select-dropdown {
    margin-top: 4px;
}
.head-search {
    display: inline-block;
    width: 200px;
    height: 70px;
    line-height: 70px;
    vertical-align: top;
    margin: -5px 10px 0 25px;
}
.head-right {
    margin-left: 30px;
    margin-top: -4px;
}
.head-right .btn-icon{
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #ccc;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    color: #fff;
    vertical-align: middle;
    margin-left: 5px;
}
.head-right .ivu-avatar,
.head-right .btn-icon {
    cursor: pointer;
}
</style>
