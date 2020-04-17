
const Tiles = Object.freeze({
	HEIGHT: 100,
	WIDTH: 60,
	COLOR: 0xcde6d0
});

const Colors = Object.freeze({
	DEEP_BLUE: 0x00008b,
	YELLOW: 0xffff00,
	BROWN: 0x964b00,
	GREEN: 0x00ff00,
	ORANGE: 0xffa500,
	PURPLE: 0x6a0dad,
	BLUE: 0x0d98ba,
	RED: 0xff0000
});

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

const Hud = Object.freeze({
	BANK_DEFAULT_TEXT: "Cash $∞",
	TEXT_COLOR: "#FFFFFF",
	POSITIVE_COLOR: "#008C00",
	NEGATIVE_COLOR: "#FF0000",
	CASH_UPDATE_TIMEOUT: 2500
});

export {
	Tiles,
	Colors,
	TokenSprites,
	TokenNames,
	Hud
};