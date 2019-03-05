<template>
     <div class="layout" style="height:100%">
        <Layout style="height:100%">
            <Sider ref="side1" hide-trigger collapsible v-model="isCollapsed" :collapsed-width="65" style="height:100%">
                <i-sider :activeName="activeName" :opennames="opennames" :isCollapsed="isCollapsed"></i-sider>
            </Sider>
            <Layout style="height:100%">
                <Header>
                    <div style="float:left">
                        <Icon @click.native="collapsedSider" :class="rotateIcon" style="margin:-6px 0px 0px -15px;cursor:pointer;" type="md-menu" size="24"></Icon>
                    </div>
                    <i-header></i-header>
                </Header>
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
import ISider from '../sider/Sider'

export default {
    data () {
        return {
            isCollapsed: true
        }
    },
    components: {
        IHeader,
        ISider
    },
    computed: {
        activeName(){
            return this.$route.path;
        },
        opennames() {
            let opennames = [];
            if (this.$route.path.indexOf("children") != -1) {
                opennames[0] = this.$route.matched[0].path;
                var i = this.$route.matched[1].path.lastIndexOf("/");
                opennames[1] = this.$route.matched[1].path.substr(0, i);
            } else {
                opennames[0] = this.$route.matched[0].path;
            }
            return opennames
        },
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        }
    },
    methods: {
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        }
    }
}
</script>
<style>
.menu-icon{
    transition: all .3s;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.ivu-layout .ivu-layout-header {
    height: 70px;
    background: #fff;
    padding: 5px 20px 0 30px;
    border-bottom: 1px solid #dcdee2;
    z-index: 998;
}
</style>
