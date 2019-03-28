import Vue from 'vue'
import Vuex from 'vuex'  
import { outgoingEdit } from '../api/production/productionTask.js'
Vue.use(Vuex)

const state = {
    spinShow: false,
    dataTable: []
};

const mutations = {
}

const getters = {
    computedDataTable(state) {
        return state.dataTable
    },
    computedSpinShow(state) {
        return state.spinShow
    }
}

const actions = {
    runGetTableData({commit, state}, data) {
        state.spinShow = true;
        let aaa = [];
        //尾部
        outgoingEdit({id: data.id}).then(res => {
          res.data.content.forEach(val => {
            val.deliveryData = data.deliveryData;
            aaa.push(val);
          });
          state.spinShow = false;
          state.dataTable = aaa;
        });
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

export default store