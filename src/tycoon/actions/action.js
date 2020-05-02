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
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 * 
	 * @abstract
	 */
	do() {
		throw new Error("Child class has not implemented method do()");
	}
}

/**
 * This callback is invoked once action is completed.
 * 
 * @callback BaseAction~actionCompleteCallback
 */

export default BaseAction;