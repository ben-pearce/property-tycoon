import Position from "./position";

class Go extends Position {
	constructor(game, options) {
		super(game, options);
	}

	onLanded() {
		//player collects $200 for passing GO if he lands on position 0"
		if (position = 0) {
			player.money += 200;
		}
	}

	onPassed() {

	}
}

export default Go;