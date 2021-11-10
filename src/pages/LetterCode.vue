<template>
	<svg class="letter-code-view" viewBox="0 0 250 100" @click.stop="refresh" :style="svgStyle" xmlns="http://www.w3.org/2000/svg" version="1.1" >
		<line v-for="(item,index) in points" :x1="item.x" :y1="item.y" :x2="item.x+1" :y2="item.y+1" :style="`stroke: ${item.c};stroke-width: 6;`" v-bind:key="index" ></line>
		<line v-for="(item,index) in lines" :x1="item.x1" :y1="item.y1" :x2="item.x2" :y2="item.y2" :style="`stroke: ${item.c};stroke-width: 6;`" v-bind:key="index" ></line>
		<text v-for="(item,index) in letters" :x="item.x" :y="item.y" :style="`color: ${item.c};stroke: ${item.c};stroke-width: 4;${this.textStyle(item)}`" v-bind:key="index" >{{item.l}}</text>
	</svg>
</template>

<script>
export default {
	data() {
		return {
			bgc: null,
			points: null,
			lines: null,
			letters: null
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
			return `text-shadow: 0 5px 5px ${item.c};
				-webkit-transform: rotate(${item.rotate}deg);
				-moz-transform: rotate(${item.rotate}deg);
				-o-transform: rotate(${item.rotate}deg);
				transform: rotate(${item.rotate}deg);`;
		},
		refresh() {
			this.bgc = this.randomColor(190);
			for (let i = 0; i < this.points.length; i++) {
				this.points[i] = this.randomPosition(250, 100)
			}
			for (let i = 0; i < this.lines.length; i++) {
				this.lines[i] = this.randomLine()
			}
			for (let i = 0; i < this.letters.length; i++) {
				this.letters[i] = this.randomLetter(i)
			}
		},
		randomLine() {
			return {
				x1: this.randomNumber(250),
				x2: this.randomNumber(250),
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
				x: 60 * i + 30,
				y: 50,
				rotate: Math.round(Math.random() * 20) - 10
			}
		},
		randomColor(min, max) {
			let g = (max || 255) - min;
			if (g < 0 || g > 255) return 'rgb(0, 240, 200)';
			return `rgb(${min + Math.round(Math.random() * g)}, ${min + Math.round(Math.random() * g)}, ${min + Math.round(Math.random() * g)})`
		},
		randomNumber(max) {
			return Math.round(Math.random() * max)
		}
	}
}
</script>

<style lang="scss" scoped >
.letter-code-view {
	width: 100%;
	height: 100%;
	
	line {
		stroke-linecap: round;
	}
	
	text {
		-webkit-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
		user-select: none;
		font-size: 50px;
		line-height: 50px;
		transform-origin: 50% 50%;
		dominant-baseline: middle;
	}
}
</style>
