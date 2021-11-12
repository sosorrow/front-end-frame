<template>
	<div class="home-view" >
		<div class="popup-view" >
			<LoginForm ref="login" v-on:submit="onLogin" />
			<!-- <LetterCode v-on:oncheck="showResult" /> -->
		</div>
	</div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import LetterCode from '../components/LetterCode.vue'
export default {
	data() {
		return {
			
		}
	},
	methods: {
		onLogin(data) {
			console.log(data);
			if (data.account === 'admin' && data.password === '123456') {
				
			} else this.$refs.login.error();
		},
		showResult(v) {
			console.log(v)
		}
	},
	components: {
		LoginForm, LetterCode
	}
}
</script>

<style lang="scss" scoped >
.home-view {
	position: relative;
	width: 100%;
	height: 100%;
	
	.popup-view {
		position: absolute;
		width: 90%;
		left: 50%;
		top: 50%;
		-webkit-transform: translate3d(-50%, -50%, 0);
		-moz-transform: translate3d(-50%, -50%, 0);
		-o-transform: translate3d(-50%, -50%, 0);
		transform: translate3d(-50%, -50%, 0);
		box-sizing: border-box;
		padding: 3rem 1rem;
		border: 1px solid #000000;
		background-color: rgba(0, 0, 0, .8);
	}
}
</style>
