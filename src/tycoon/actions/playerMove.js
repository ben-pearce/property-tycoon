import BaseAction from "./action";


class PlayerMove extends BaseAction {
	constructor(steps, direction=1) {
		super();
        
		this.steps = steps;
		this.direction = direction;
	}

	do(game, player) {
		// player is moved this.direction this.steps steps
		console.log(player);
	}
}

export default PlayerMove;