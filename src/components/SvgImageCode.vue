<template>
	<svg class="letter-code-view" viewBox="0 0 500 100" @click.stop="refresh" :style="svgStyle" xmlns="http://www.w3.org/2000/svg" version="1.1" v-if="this.bgc" >
		<line v-for="(item,index) in points" :x1="item.x" :y1="item.y" :x2="item.x" :y2="item.y" :style="`stroke: ${item.c};stroke-width: 10;opacity: .9;`" v-bind:key="index" ></line>
		<line v-for="(item,index) in lines" :x1="item.x1" :y1="item.y1" :x2="item.x2" :y2="item.y2" :style="`stroke: ${item.c};stroke-width: 10;`" v-bind:key="index" ></line>
		<text v-for="(item,index) in letters" x="0" y="0" :transform="`translate(${item.x},${item.y})`" :rotate="item.rotate" text-anchor="middle" :style="`color: ${item.c};stroke: ${item.c};stroke-width: 2;${this.textStyle(item)}`" v-bind:key="index" >{{item.l}}</text>
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
	},
	computed: {
		svgStyle() {return `background-color: ${this.bgc};`}
	},
	methods: {
		textStyle(item) {
			return `text-shadow: 0 10px 10px ${item.c}`;
		},
		draw(letter) {
			if (!letter) return;
			this.bgc = this.randomColor(190);
			for (let i = 0; i < this.points.length; i++) {
				this.points[i] = this.randomPosition(500, 100)
			}
			for (let i = 0; i < this.lines.length; i++) {
				this.lines[i] = this.randomLine()
			}
			for (let i = 0; i < letter.length; i++) {
				let w = this.randomLetter(i);
				w.l = letter.charAt(i)
				this.letters[i] = w;
			}
		},
		refresh() {
			this.$emit('refresh')
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
		position: absolute;
		-webkit-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
		user-select: none;
		font-size: 80px;
		dominant-baseline: middle;
	}
}
</style>
