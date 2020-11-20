<template>
    <div class="container">
        <h1 class="mt-5 text-center ml-3 mb-3">Frontend Challenge</h1>
        <div>
            <b-form inline>
            <b-col sm="9">
                <b-form-input
                        id="inline-form-input-name"
                        class="mb-2 mr-sm-2 mb-sm-0 w-100"
                        placeholder="Pozisyon, firma adı"
                        v-model="searchText"
                        >

                </b-form-input>
            </b-col>
            <b-col sm="3">
                <b-form-select v-model="searchCity" :options="cities" >
                    <template #first>
                        <b-form-select-option :value="null" disabled>Şehir Seçiniz</b-form-select-option>
                    </template>
                </b-form-select>
                <b-button class="ml-2" v-on:click="search" variant="primary">Arama</b-button>
            </b-col>
        </b-form>
    </div>

        <div class="jobs ml-3 mt-3">
            <div v-if="jobs.length">
                <div v-for="job in jobs" :key="job.id">
                    <router-link :to="{ name: 'jobDetail',
                    params: {
                        jobId: job.id,
                    }}">
                        <div class="job-card d-flex rounded flex-column border p-3 mb-3 mr-3">
                              <div class="job-card-title text-dark">{{job.title}}</div>
                              <div class="job-card-company text-dark">{{job.companyName}}</div>
                              <div class="job-card-city text-dark">{{job.cityName}}</div>
                        </div>
                    </router-link>

                </div>
            </div>
        </div>
        <div v-if="result" class="no-result ml-3 mt-3">
            İş ilanı bulunamadı.
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AppHome',
    data() {
        return {
            searchCity: null,
            searchText: null,
        }
    },
    computed: mapState(['jobs', 'result', 'cities']),
    mounted () {
            this.$store.dispatch('loadCities');
    },
    methods: {
         search: function (event) {
            const payload = {
                search: this.searchText,
                city: this.searchCity,
            };
             this.$store.dispatch('loadJobs', payload);
        }
    }
};
</script>
<style>
    .jobs a:hover {
        text-decoration: none;
    }
</style>