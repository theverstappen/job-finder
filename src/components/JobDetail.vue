<template>
    <div class="container" v-if="job.title">
        <h1 class="mt-5 mb-3">{{job.title}} - {{job.cityName}}</h1>
        <h2 class="mb-3">{{job.companyName}}</h2>
        <p>{{job.description}}</p>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'JobDetail',
    props: ["jobId"],
    created () {
        this.getJobDetail();
    },
    methods: {
        async getJobDetail() {
            const payload = {
                id: this.jobId,
            };
            await this.$store.dispatch('loadJobDetail',payload);
        }
    },
    computed: mapState(['job']),
};
</script>

<style scoped>

</style>