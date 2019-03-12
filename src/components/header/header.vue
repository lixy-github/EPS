<template>
    <div>
        <div class="header clearfix">
            <!-- 左侧 -->
            <div class="header-left lt">
                <span class="head-title">易品速协同制造平台</span>
                <div class="select-dropdown">
                    <Dropdown>
                        <a href="javascript:void(0)">
                            <i class="dropdown-icon"></i>
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>协同制造</DropdownItem>
                            <DropdownItem>工业互联</DropdownItem>
                            <DropdownItem>金融服务</DropdownItem>
                            <DropdownItem>工艺设计</DropdownItem>
                            <DropdownItem>行业云</DropdownItem>
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
                <Dropdown>
                    <a href="javascript:void(0)">
                        <!-- 下拉菜单 -->
                        <span class="btn-icon fa fa-power-off"></span>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem >
                            <p @click="Logout"><Icon type="md-power" /> 退出登陆</p>
                        </DropdownItem>
                        <DropdownItem >
                            <p @click="Changep"><Icon type="md-unlock" /> 更改密码</p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import Storage from "../../libs/Storage"
export default {
    data () {
        return {
        }
    },
    methods:{
        //退出登陆
        Logout(){
            Storage.remove("token")
            this.$router.push('/login')
        },
        //更改密码
        Changep(){}
    },
}
</script>
<style>
.header .ivu-menu-horizontal.ivu-menu-light:after {
    display: none;
}
.header-left .head-title {
    display: inline-block;
    height: 70px;
    line-height: 70px;
    vertical-align: top;
    color: #333;
    font-size: 18px;
    margin: -5px 40px 0 8px;
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
    margin-right: 13px;
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
