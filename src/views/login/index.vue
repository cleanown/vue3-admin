<template>
	<vue-particles id="tsparticles" :options="particlesOptions" />
	<div class="login fcc">
		<el-card class="login-box">
			<div v-for="item in 10">士大夫十分</div>
  	</el-card>
	</div>
</template>

<script setup lang='ts'>
import { reactive } from "vue"
const particlesOptions = reactive({
	background: {
		color: {
			value: '#000'
		}
	},
	fpsLimit: 120,
	interactivity: {
		events: {
			onClick: {
				enable: true,
				mode: 'push'
			},
		},
		// modes: {
		// 	bubble: {
		// 		distance: 400,
		// 		duration: 2,
		// 		opacity: 0.8,
		// 		size: 40
		// 	},
		// 	push: {
		// 		quantity: 4
		// 	},
		// 	repulse: {
		// 		distance: 200,
		// 		duration: 0.4
		// 	}
		// }
	},
	preset: "Sea Anemone",
	particles: {
		color: {
			value: '#ffffff'
		},
		links: {
			color: '#ffffff',
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 1
		},
		move: {
			direction: 'none',
			enable: true,
			outModes: 'bounce',
			random: false,
			speed: 3,
			straight: false
		},
		number: {
			density: {
				enable: true,
			},
			value: 120
		},
		opacity: {
			value: 0.5
		},
		size: {
			value: { min: 1, max: 5 }
		}
	},
	detectRetina: true,
})
</script>

<style lang="scss" scoped>
.login {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
	background: transparent;
	.login-box{
	
	}
}
</style>