<template>
	<div class="letter-code-view" >
		<div class="letter-code-cont" >
			<svg class="letter-code-view" viewBox="0 0 500 100" @click.stop="refresh" :style="svgStyle" xmlns="http://www.w3.org/2000/svg" version="1.1" >
				<line v-for="(item,index) in points" :x1="item.x" :y1="item.y" :x2="item.x" :y2="item.y" :style="`stroke: ${item.c};stroke-width: 10;opacity: .9;`" v-bind:key="index" ></line>
				<line v-for="(item,index) in lines" :x1="item.x1" :y1="item.y1" :x2="item.x2" :y2="item.y2" :style="`stroke: ${item.c};stroke-width: 10;`" v-bind:key="index" ></line>
				<text v-for="(item,index) in letters" x="0" y="0" :transform="`translate(${item.x},${item.y})`" :rotate="item.rotate" text-anchor="middle" :style="`color: ${item.c};stroke: ${item.c};stroke-width: 10;${this.textStyle(item)}`" v-bind:key="index" >{{item.l}}</text>
			</svg>
		</div>
		<div class="letter-code-input-cont" >
			<input class="letter-code-input" type="text" placeholder="请输入验证码" v-model="code" />
			<div class="letter-code-check-btn" @click.stop="checkLetterCode" >
				<span>立即验证</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			bgc: null,
			points: null,
			lines: null,
			letters: null,
			letter: null,
			code: ''
		}
	},
	created() {
		this.points = new Array(50);
		this.lines = new Array(10);
		this.letters = new Array(4);
		this.refresh();
	},
	computed: {
		svgStyle() {return `background-color: ${this.bgc};`}
	},
	methods: {
		textStyle(item) {
			return `text-shadow: 0 10px 10px ${item.c}`;
		},
		refresh() {
			this.bgc = this.randomColor(190);
			for (let i = 0; i < this.points.length; i++) {
				this.points[i] = this.randomPosition(500, 100)
			}
			for (let i = 0; i < this.lines.length; i++) {
				this.lines[i] = this.randomLine()
			}
			this.letter = '';
			for (let i = 0; i < this.letters.length; i++) {
				this.letters[i] = this.randomLetter(i)
				this.letter += this.letters[i].l;
			}
		},
		randomLine() {
			return {
				x1: this.randomNumber(500),
				x2: this.randomNumber(500),
				y1: this.randomNumber(100),
				y2: this.randomNumber(100),
				c: this.randomColor(80, 190)
			}
		},
		randomPosition(maxX, maxY) {
			return {
				x: this.randomNumber(maxX),
				y: this.randomNumber(maxY),
				c: this.randomColor(80, 190)
			}
		},
		randomLetter(i) {
			return {
				l: (() => {let a = Math.floor(Math.random() * 10);return a === 10 ? 9: a})().toString(),
				c: this.randomColor(0, 80),
				x: 125 * i + 70,
				y: 60,
				rotate: Math.round(Math.random() * 40) - 20
			}
		},
		randomColor(min, max) {
			let g = (max || 255) - min;
			if (g < 0 || g > 255) return 'rgb(0, 240, 200)';
			return `rgb(${min + Math.round(Math.random() * g)}, ${min + Math.round(Math.random() * g)}, ${min + Math.round(Math.random() * g)})`
		},
		randomNumber(max) {
			return Math.round(Math.random() * max)
		},
		checkLetterCode() {
			this.$emit('oncheck', this.code === this.letter)
		}
	}
}
</script>

<style lang="scss" scoped >
.letter-code-view {
	width: 100%;

	svg {
		width: 100%;
		height: 100%;
		
		line {
			stroke-linecap: round;
		}
		
		text {
			position: absolute;
			-webkit-user-select: none;
			-moz-user-select: none;
			-o-user-select: none;
			user-select: none;
			font-size: 80px;
			dominant-baseline: middle;
		}
	}
	
	.letter-code-input-cont {
		margin-top: 20px;
		height: 70px;
		
		input {
			width: 58%;
			height: 100%;
			font-size: 30px;
			line-height: 70px;
			border-radius: 5px;
			text-indent: 20px;
			letter-spacing: 10px;
		}
		
		input::placeholder {
			letter-spacing: 0 !important;
		}
		
		.letter-code-check-btn {
			float: right;
			width: 38%;
			height: 100%;
			text-align: center;
			border-radius: 5px;
			background-color: blue;
			
			span {
				color: #FFFFFF;
				letter-spacing: 5px;
				font-size: 32px;
				line-height: 70px;
				font-weight: bold;
			}
		}
		
		.letter-code-check-btn::after {
			clear: both;
		}
	}
}
</style>
