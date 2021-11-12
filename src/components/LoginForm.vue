<template>
	<div class="login-form-view" >
		<div class="login-form-item login-account-cont" >
			<input type="text" maxlength="24" placeholder="请输入您的账号" v-model="account" autocomplete="off" />
		</div>
		<div class="login-form-item login-password-cont" >
			<input type="password" maxlength="24" placeholder="请输入您的密码" v-model="password" autocomplete="off" />
		</div>
		<div class="login-form-item login-checkcode-cont" :class="errorCount >= 2 ? 'checkcode-show': ''" >
			<div class="login-form-checkcode" >
				<svgimagecode ref="imagecode" v-on:refresh="refresh" />
			</div>
			<div class="login-form-checkcode-input" >
				<input type="text" v-model="checkcode" placeholder="请输入验证码" autocomplete="off" />
			</div>
		</div>
		<div class="login-form-item login-submit-cont" >
			<div class="btn login-submit-btn" @click.stop="submit" >
				<span>立即登录</span>
			</div>
		</div>
	</div>
</template>

<script>
import svgimagecode from './SvgImageCode.vue'
export default {
	data() {
		return {
			account: '',
			password: '',
			checkcode: '',
			letter: null,
			errorCount: 0,
			letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTVUVWXYZ0123456789'
		}
	},
	mounted() {
		this.refresh();
	},
	methods: {
		submit() {
			this.$emit('submit', { account: this.account, password: this.password, code: this.checkcode });
		},
		refresh() {
			// 模拟后台验证码
			this.letter = '';
			for (let i = 0; i < 6; i++) {
				this.letter += this.letters.charAt((() => {let i = Math.round(Math.random() * this.letters.length); return i === this.letters.length ? (i - 1): i})())
			}
			// 刷新图像
			this.$refs.imagecode.draw(this.letter);
		},
		error() {
			this.errorCount++;
		}
	},
	components: {
		svgimagecode
	}
}
</script>

<style lang="scss" scoped >
.login-form-view {
	
	
	.login-form-item {
		height: 70px;
		margin-top: 30px;
		
		input {
			width: 100%;
			height: 100%;
			font-size: 30px;
			line-height: 70px;
			border-radius: 8px;
			text-indent: 15px;
			letter-spacing: 2px;
			color: rgb(33, 33, 33)
		}
		
		input::placeholder {
			color: rgb(210, 210, 210)
		}
		
		.login-form-checkcode,
		.login-form-checkcode-input {
			display: inline-block;
			width: 48%;
			height: 70px;
		}
		
		.login-form-checkcode-input {
			float: right;
		}
		
		.login-submit-btn {
			height: 100%;
			text-align: center;
			background-color: blue;
			border-radius: 10px;
			
			span {
				font-size: 36px;
				line-height: 70px;
				color: #FFFFFF;
				letter-spacing: 30px;
				font-weight: bold;
			}
		}
	}
	
	.login-checkcode-cont {
		height: 0;
		overflow-y: hidden;
		-webkit-transition: height linear .3s;
		-moz-transition: height linear .3s;
		-o-transition: height linear .3s;
		transition: height linear .3s;
	}
	
	.checkcode-show {
		height: 70px !important;
	}
}
</style>
