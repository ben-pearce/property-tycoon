import BaseAction from "./action";


class PlayerGoToJail extends BaseAction {
	constructor() {
		super();
	}

	do(game, player) {
		// player is sent to jail and is given usual restrictions for jailed players
		console.log(player);
	}
}

export default PlayerGoToJail;