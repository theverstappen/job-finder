import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
    state: {
        jobs: [],
        result: false,
        cities: [],
        job: []
    },
    mutations: {
        SET_JOBS ( state, jobs ) {
            state.jobs = jobs;
            (jobs.length) ? state.result = false : state.result = true;
        },
        SET_JOB_DETAIL ( state, job ) {
            state.job = job;
        },
        SET_CITIES (state, cities){
            state.cities = cities.map( city => ({text: city.name, value: city.name}));
        }
    },
    actions: {
          loadJobs ( { commit }, { search, city } ) {
              axios
                .get('http://my-json-server.typicode.com/theverstappen/job-list/jobs', {
                    params:{
                        q: search,
                        cityName: city
                    }
                }).then(response => response.data)
                .then(jobs => {
                    commit('SET_JOBS', jobs);
                });
        },
          loadCities ( { commit } ) {
              if(!this.state.cities.length){
                  axios
                      .get('https://api.mocki.io/v1/adec74db', {
                      }).then(response => response.data)
                      .then(cities => {
                          commit('SET_CITIES', cities);
                      });
              }
        },
          async loadJobDetail ( { commit }, { id } ) {

                  if(this.state.job) {
                      commit('SET_JOB_DETAIL', null);
                  }
                let res = await axios.get(`http://my-json-server.typicode.com/theverstappen/job-list/jobs/${id}`);

                commit('SET_JOB_DETAIL', res.data);

            },
    }
});