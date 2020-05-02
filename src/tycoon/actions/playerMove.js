import BaseAction from "./action";
import {Direction} from "../../enums";

/**
 * Action class for moving a player a specified
 * number of steps in a specified direction.
 * 
 * @implements BaseAction
 * @memberof Actions
 * 
 * @property {integer} steps The number of steps player will move.
 * @property {Enums.Direction} direction The direction player should move in.
 */
class PlayerMove extends BaseAction {
	/**
	 * Takes the steps to move the player and the direction
	 * to move in.
	 * 
	 * @param {integer} steps The number of steps to move.
	 * @param {Enums.Direction} [direction=Direction.FORWARDS] The direction to move the player.
	 */
	constructor(steps, direction=Direction.FORWARDS) {
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
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 */
	do(game, player, cb) {
		if(this.direction === Direction.FORWARDS) {
			player.moveForwards(this.steps, cb);
		} else if (this.direction === Direction.BACKWARDS) {
			player.moveBackwards(this.steps, cb);
		}
	}
}

export default PlayerMove;