let CardTypes = [
	{ name: "vue", image: "https://vuejs.org/images/logo.png" },
	{ name: "express", image: "https://coligo.io/images/express.svg" },
	{
		name: "mongo",
		image:
			"https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png"
	},
	{ name: "nodejs", image: "https://worldvectorlogo.com/logos/nodejs-icon.svg" },
	{
		name: "webpack",
		image:
			"https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67"
	},
	{ name: "babel", image: "https://babeljs.io/images/logo.svg" }
	//{ name: "jade", image: "http://jade-lang.com/style/jade-logo-header.svg" },
];

let shuffleCards = () => {
	let cards = [].concat(_.cloneDeep(CardTypes), _.cloneDeep(CardTypes));
	return _.shuffle(cards);
};
new Vue({
	el: "#app",

	data: {
		showSplash: false,
		cards: [],
		started: false,
		startTime: 0,
		turns: 0,
		flipBackTimer: null,
		timer: null,
		time: "--:--",
		score: 0,
        flipped: false,
        found: false,
        counter: 0,
        index: 0,
        question: {
            id: "",
            desc: ""
        },
        questions: [
            {
                id: 1,
                desc: "Kerja itu apa sih?"
            },
            {
                id: 2,
                desc: "Jenajng karir itu penting gak?"
            },
            {
                id: 3,
                desc: "Goals dalam pekerjaan?"
            },
            {
                id: 4,
                desc: "Apa makna profesional?"
            }
        ]
	},

	methods: {
		resetGame() {
			this.showSplash = false;
			let cards = shuffleCards();
			this.turns = 0;
			this.score = 0;
			this.started = false;
			this.startTime = 0;

			cards.forEach((card) => {
				card.flipped = false;
				card.found = false;
			});

			this.cards = cards;
		},

		flippedCards() {
			return this.cards.filter((card) => card.flipped);
		},

		sameFlippedCard() {
			let flippedCards = this.flippedCards();
			if (flippedCards.length == 2) {
				if (flippedCards[0].name == flippedCards[1].name) return true;
			}
		},

		setCardFounds() {
			this.cards.forEach((card) => {
				if (card.flipped) card.found = true;
			});
		},

		checkAllFound() {
			let foundCards = this.cards.filter((card) => card.found);
			if (foundCards.length == this.cards.length) return true;
		},

		startGame() {
			this.started = true;
			this.startTime = moment();

			this.timer = setInterval(() => {
				this.time = moment(moment().diff(this.startTime)).format("mm:ss");
			}, 1000);
		},

		finishGame() {
			this.started = false;
			clearInterval(this.timer);
			let score =
				1000 -
				(moment().diff(this.startTime, "seconds") - CardTypes.length * 5) * 3 -
				(this.turns - CardTypes.length) * 5;
			this.score = Math.max(score, 0);
			this.showSplash = true;
		},

		flipCard(card) {
			if (card.found || card.flipped) return;

			if (!this.started) {
				this.startGame();
			}

			let flipCount = this.flippedCards().length;
			if (flipCount == 0) {
				card.flipped = !card.flipped;
			} else if (flipCount == 1) {
				card.flipped = !card.flipped;
				this.turns += 1;

				if (this.sameFlippedCard()) {
					// Match!
					this.flipBackTimer = setTimeout(() => {
						this.clearFlipBackTimer();
						this.setCardFounds();
						this.clearFlips();

						if (this.checkAllFound()) {
							this.finishGame();
						}
					}, 200);
				} else {
					// Wrong match
					this.flipBackTimer = setTimeout(() => {
						this.clearFlipBackTimer();
						this.clearFlips();
					}, 1000);
				}
			}
		},

        openCard() {
            this.flipped = !this.flipped
            this.counter++
            if (this.counter % 2 == 1 && this.index != this.questions.length) {
                this.question = this.questions[this.index]
                this.index++
            } else if (this.counter % 2 == 1 && this.index == this.questions.length) {
                this.question = {
                    desc: "Selesai"
                }
            }
        },

		clearFlips() {
			this.cards.map((card) => (card.flipped = false));
		},

		clearFlipBackTimer() {
			clearTimeout(this.flipBackTimer);
			this.flipBackTimer = null;
		}
	},

	created() {
		this.resetGame();
	}
});
