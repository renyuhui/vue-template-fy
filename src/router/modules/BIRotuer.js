import LayoutCharts from '@/LayoutCharts'

const BIRouter = [
    {
        path: '/navigation',
        component: LayoutCharts,
        redirect: '/navigation',
        children: [{
            path: 'index',
            name: 'navigation',
            component: () => import('@/views/navigation/index'),
            // meta: { title: 'navigation', icon: 'dashboard' },
            // hidden: true
        }, {
            path: 'hospital',
            name: 'hospital',
            component: () => import('@/views/navigation/hospital'),
            // meta: { title: 'hospital', icon: 'dashboard' },
            // hidden: true
        }, {
            path: 'province',
            name: 'province',
            component: () => import('@/views/navigation/province'),
            // meta: { title: 'hospital', icon: 'dashboard' },
            // hidden: true
        }]
    }
]

export default BIRouter