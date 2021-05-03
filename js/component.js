const Home  = { template: '<div>Ini Homee</div>' }
const About = { template: '<div>Ini About</div>' }
const detailKelas = {
	template: `
	<template v-if="detail_kelas">
	<img :src="detail_kelas.gambar" width="200" class="gambar"/> <br>
	<h3>{{detail_kelas.judul}} - {{$route.params.id_kelas}}</h3>
	<p>{{detail_kelas.deskripsi}}</p>
	<router-link to="/kelas">kembali</router-link>
	</template>
	<p v-else>Kelas tidak ada</p>
	`,
	data(){
		return {
			detail_kelas: {}
		}
	},
	created(){
		this.filterKelasById()
	},
	methods: {
		filterKelasById() {
			let id = this.$route.params.id_kelas
			let refKelasDetail = db.ref('kelas/'+id)
			refKelasDetail.on('value', (item) => {
				this.detail_kelas = item.val()
			})
		}
	}
}
const Notfound = { template: '<div>Ini halaman not found</div>' }
const Kelas = {
	props: ['child'],
	template: `
	<div>
	<h5>Tambah kelas dengan enter</h5>
	<form @submit.prevent="submitKelasChild">						
	<div class="form-group">
	<label>Judul</label> <br>
	<input type="text" placeholder="Judul" v-model="kelas.judul">
	<div class="error" v-if="error.judul">{{error.judul}}</div>
	</div>
	<div class="form-group">
	<label>Deskripsi</label> <br>
	<textarea v-model="kelas.deskripsi"></textarea>
	<div class="error" v-if="error.deskripsi">{{error.deskripsi}}</div>
	</div>
	<div class="form-group">
	<img :src="previewimg" v-if="previewimg" width="200"/> <br>
	<label>Gambar</label> <br>
	<input type="file" ref="gambar" @change="uploadFile">
	</div>
	<br>
	<button type="submit">Tambahkan</button>
	</form>
	<template v-if="child.length > 0">
	<ul>
	<!-- melooping data array dan memunculkannya -->
	<li v-for="(k, index) of child" style="margin-bottom: 30px;">
	<img :src="k.gambar" alt="" class="gambar" /> <br>
	{{index+1}} - {{k.judul}} - {{k.deskripsi}}
	<!-- menghapus data menggunakan parameter index/key nya -->
	<router-link :to="'/kelas/' + k.id">Lihat kelas</router-link>
	<a href="" @click.prevent="$emit('hapuskelas', k.id)">hapus</a><hr>
	</li>
	</ul>				
	</template>
	<p v-else>
	<b>Belum  ada kelas, silakan tambahkan kelas</b>
	</p>
	<p class="text-danger" style="display: none">
	Berhasil menghapus data
	</p>
	</div>
	`,
	data: function(){
		return {
			kelas: {
				judul: '',
				deskripsi: '',
				gambar: ''
			},
			error: {
				judul: '',
				deskripsi: ''
			},
			previewimg: ''
		}
	},
	methods: {
		submitKelasChild: function(){
			if (this.kelas.judul == '') {
				this.error.judul = 'Judul wajib diisi'
			}else{
				this.error.judul = ''
			}
			if(this.kelas.deskripsi == ''){
				this.error.deskripsi = 'Deskripsi wajib diisi'
			}else{
				this.error.deskripsi = ''
			}
			if (this.kelas.judul && this.kelas.deskripsi) {
				const sendData = {
					id: uuidv4(),
					judul: this.kelas.judul,
					deskripsi: this.kelas.deskripsi,
					gambar: this.previewimg
				}
				this.$emit('em-submitkelas', sendData)

				this.kelas.judul = ''
				this.kelas.deskripsi = ''
				this.kelas.gambar = ''
				this.previewimg = ''
				this.$refs.gambar.value = ''
			}					
		},
		uploadFile: function(event){
			this.kelas.gambar = URL.createObjectURL(event.target.files[0])
			this.previewimg   = URL.createObjectURL(event.target.files[0])
		}
	}
}		

Vue.component('c-header', {			
	props: ['message'],
	template: `
	<header>
	<img style="height: 200px;border-radius: 10px;display: block;margin-bottom: 20px;" src="../images/vue2.png" alt="gambar">
	<p>ini {{message}}</p>
	</header>
	`,
	data: function(){
		return {
			pesan: 'Heloo, Component !'
		}
	}
})

Vue.component('c-footer', {
	template: `
	<footer id="footer">
	<p>copyright 2021</p>			
	</footer>
	`			
})