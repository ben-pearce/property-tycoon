/**
 * Enum for tile graphics.
 * 
 * @readonly
 * @memberof Enums
 * @enum {number}
 */
const Tiles = Object.freeze({
	HEIGHT: 100,
	WIDTH: 60,
	COLOR: 0xCDE6D0
});

/**
 * Enum for property colors.
 * 
 * @readonly
 * @memberof Enums
 * @enum {number}
 */
const Colors = Object.freeze({
	DEEP_BLUE: 0x00008B,
	YELLOW: 0xFFFF00,
	BROWN: 0x964B00,
	GREEN: 0x00FF00,
	ORANGE: 0xFFA500,
	PURPLE: 0x6A0DAD,
	BLUE: 0x0D98BA,
	RED: 0xFF0000
});

/**
 * Enum for token sprite tags.
 * 
 * @readonly
 * @memberof Enums
 * @enum {string}
 */
const TokenSprites = Object.freeze({
	BOOT: "boot",
	CAT: "cat",
	GOBLET: "goblet",
	HATSTAND: "hatstand",
	SMARTPHONE: "smartphone",
	SPOON: "spoon",
	BANK: "bank",
	PARKING: "parking"
});

/**
 * Enum for token names.
 * 
 * @readonly
 * @memberof Enums
 * @enum {string}
 */
const TokenNames = Object.freeze({
	BOOT: "Boot",
	CAT: "Cat",
	GOBLET: "Goblet",
	HATSTAND: "Hatstand",
	SMARTPHONE: "Smartphone",
	SPOON: "Spoon",
	BANK: "Bank",
	PARKING: "Free Parking"
});

/**
 * Enum for HUD styles.
 * 
 * @readonly
 * @memberof Enums
 * @enum {string}
 */
const Hud = Object.freeze({
	BANK_DEFAULT_TEXT: "Cash £∞",
	TEXT_COLOR: "#FFFFFF",
	POSITIVE_COLOR: "#008C00",
	NEGATIVE_COLOR: "#FF0000",
	CASH_UPDATE_TIMEOUT: 2500
});

/**
 * Enum for card styles.
 * 
 * @readonly
 * @memberof Enums
 * @enum {integer}
 */
const Cards = Object.freeze({
	WIDTH: 400,
	HEIGHT: 600,
	COLOR: 0xFFFFFF
});

/**
 * Enum for button colors.
 * 
 * @readonly
 * @memberof Enums
 * @enum {integer}
 */
const Buttons = Object.freeze({
	GREEN: 0x17B70F,
	AMBER: 0xEBA417,
	RED: 0xD63434,
});

export {
	Tiles,
	Colors,
	TokenSprites,
	TokenNames,
	Hud,
	Cards,
	Buttons
};