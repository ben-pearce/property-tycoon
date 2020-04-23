/**
 * @namespace Actions
 */

/**
 * Base action that all action classes should 
 * implement.
 * 
 * @interface
 * @memberof Actions
 */
class BaseAction {
	/**
	 * Perform this action.
	 * 
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to perform action on.
	 * @abstract
	 */
	do() {
		throw new Error("Child class has not implemented method do()");
	}
}

export default BaseAction;