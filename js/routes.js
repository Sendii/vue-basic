const routes = [
{ path: '/', component: Home },
{ path: '/about', component: About },
{ path: '/kelas', component: Kelas },
{ path: '/kelas/:id_kelas', component: detailKelas },
{ path: '*', component: Notfound}
]

const router = new VueRouter({
	mode: 'history',
	routes
})