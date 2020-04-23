import BaseAction from "./action";

/**
 * Action class for moving a player a specified
 * number of steps in a specified direction.
 * 
 * @implements BaseAction
 * @memberof Actions
 * 
 * @property {integer} steps The number of steps player will move.
 * @property {integer} direction The direction player should move in.
 */
class PlayerMove extends BaseAction {
	/**
	 * Takes the steps to move the player and the direction
	 * to move in.
	 * 
	 * @param {integer} steps The number of steps to move.
	 * @param {integer} [direction=1] The direction to move the player.
	 */
	constructor(steps, direction=1) {
		super();
        
		this.steps = steps;
		this.direction = direction;
	}

	/**
	 * Moves a player in {@link direction} {@link steps}.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to move.
	 */
	do(game, player) {
		// player is moved this.direction this.steps steps
		console.log(player);
	}
}

export default PlayerMove;