<template>
    <Row>
        <Spin fix v-if="toggleSpin" >
            <Icon type="ios-loading" class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </Row>
</template>
<script>
export default {
    data(){
        return {
            toggleSpin:false
        }
    }
}
</script>


<style scoped>
    .ivu-spin-text{
        z-index: 99999;
        margin: auto
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
        z-index: 99999;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    /* .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    } */
</style>