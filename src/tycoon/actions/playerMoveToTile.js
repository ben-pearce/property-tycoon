import BaseAction from "./action";

/**
 * Action class for moving a player to a specified
 * tile on the board.
 * 
 * @implements BaseAction
 * @memberof Actions
 * 
 * @property {integer} tileId The ID of the tile the player will move to.
 * @property {direction} direction The direction to move the player in.
 */
class PlayerMoveToTile extends BaseAction {
	/**
	 * Takes the tile ID to move the player to and the direction
	 * to move.
	 * 
	 * @param {integer} tileId The ID of the tile the player will move to.
	 * @param {integer} [direction=1] The direction to move the player.
	 */
	constructor(tileId, direction=1) {
		super();
        
		this.tileId = tileId;
		this.direction = direction;
	}

	/**
	 * Moves a player to tile at {@link tileId} in the direction
	 * of {@link direction}.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to move.
	 */
	do(game, player) {
		// player is moved to tile with tile id this.tileId in this.direction
		console.log(player);
	}
}

export default PlayerMoveToTile;