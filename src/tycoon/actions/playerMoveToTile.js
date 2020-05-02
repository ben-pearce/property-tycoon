import BaseAction from "./action";
import {Direction} from "../../enums";

/**
 * Action class for moving a player to a specified
 * tile on the board.
 * 
 * @implements BaseAction
 * @memberof Actions
 * 
 * @property {integer} tileId The ID of the tile the player will move to.
 * @property {Enums.Direction} direction The direction to move the player in.
 */
class PlayerMoveToTile extends BaseAction {
	/**
	 * Takes the tile ID to move the player to and the direction
	 * to move.
	 * 
	 * @param {integer} tileId The ID of the tile the player will move to.
	 * @param {Enums.Direction} [direction=Direction.FORWARDS] The direction to move the player.
	 */
	constructor(tileId, direction=Direction.FORWARDS) {
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
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 */
	do(game, player, cb) {
		player.moveToTile(game.board.tiles[this.tileId], cb, this.direction);
	}
}

export default PlayerMoveToTile;