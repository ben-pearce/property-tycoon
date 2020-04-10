import BaseAction from "./action";


class PlayerMoveToTile extends BaseAction {
	constructor(tileId, direction=1) {
		super();
        
		this.tileId = tileId;
		this.direction = direction;
	}

	do(game, player) {
		// player is moved to tile with tile id this.tileId in this.direction
		console.log(player);
	}
}

export default PlayerMoveToTile;