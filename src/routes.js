import AppHome from '@/components/AppHome';
const JobDetail = () => import('@/components/JobDetail');


const routes = [
    {
        path: '/joblist',
        name: 'Home',
        component: AppHome
    },
    {
        path: '/jobdetail/:jobId/',
        name: 'jobDetail',
        component: JobDetail,
        props: true,
    },
    {
        path: '*',
        redirect: '/joblist',
        component: AppHome
    },

];

export default routes;
