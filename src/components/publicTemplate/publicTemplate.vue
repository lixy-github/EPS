<template>
     <div class="layout">
        <Layout>
            <Header>
                <IHeader :activeName="activeName"></IHeader>
            </Header>
            <Layout>
                <!-- <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider> -->
                <Layout>
                    <Content :style="{padding: '20px 20px 0 20px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import IHeader from '../header/header'
export default {
    data () {
        return {

        }
    },
    components: {
        IHeader
    },
    computed: {
        activeName(){
            return this.$route.path;
        }
    }
}
</script>
<style>
.ivu-menu-light {
    background: transparent;
}
.ivu-layout-header {
    height: 70px;
    background: #fff;
    padding: 5px 20px 0 30px;
    border-bottom: 1px solid #dcdee2;
    z-index: 998;
}
.ivu-menu-horizontal {
    height: 65px;
}
</style>
