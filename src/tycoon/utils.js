import {TokenSprites, TokenNames} from "../enums";

/**
 * Returns a sprite name for a token based
 * on player ID passed in.
 * 
 * i.e.
 * getTokenSpriteByPlayerId(1) -> TokenSprites.CAT -> "cat"
 * 
 * @param {Integer} playerId The player ID to get a sprite name for.
 * @returns {String} The sprite name.
 */
function getTokenSpriteByPlayerId(playerId) {
	const sprites = [
		TokenSprites.BOOT, 
		TokenSprites.CAT, 
		TokenSprites.GOBLET, 
		TokenSprites.HATSTAND, 
		TokenSprites.SMARTPHONE,
		TokenSprites.SPOON
	];
	return sprites[playerId];
}

/**
 * Returns an english name for a token based
 * on player ID passed in.
 * 
 * i.e. 
 * getTokenNameByPlayerId(1) -> TokenNames.CAT -> "Cat"
 * 
 * @param {Integer} playerId The player ID to get a token name for.
 * @returns {String} The token name.
 */
function getTokenNameByPlayerId(playerId) {
	const names = [
		TokenNames.BOOT, 
		TokenNames.CAT, 
		TokenNames.GOBLET, 
		TokenNames.HATSTAND, 
		TokenNames.SMARTPHONE,
		TokenNames.SPOON
	];
	return names[playerId];
}

/**
 * Returns the number of seconds to add to the timer
 * based on the timer option ID passed in.
 * 
 * i.e.
 * getTimerSecondsByOption(1) -> 1800
 * 
 * Returns null if the option ID is 0 to indicate a
 * disabled timer.
 * 
 * @param {Integer} option The option ID.
 * @returns {Integer} The number of seconds.
 */
function getTimerSecondsByOption(option) {
	const timerOptions = [
		null,
		1800,
		3600,
		5400,
		7200
	];
	return timerOptions[option];
}

export {
	getTokenNameByPlayerId,
	getTokenSpriteByPlayerId,
	getTimerSecondsByOption
};