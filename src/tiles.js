import Go from "./tycoon/tiles/go";
import Jail from "./tycoon/tiles/jail";
import Cop from "./tycoon/tiles/cop";

import Opportunity from "./tycoon/tiles/opportunity";
import Luck from "./tycoon/tiles/luck";

import Parking from "./tycoon/tiles/parking";
import Tax from "./tycoon/tiles/tax";

import Rentable from "./tycoon/tiles/rentable";
import Station from "./tycoon/tiles/station";
import Utility from "./tycoon/tiles/utility";

import {Colors} from "./enums";

/**
 * @typedef {Object} TileConfig
 * @property {integer} id The unique ID.
 * @property {Type} type The tile class.
 * @property {Colors} color The color group.
 * @property {string} graphic Sprite to use as graphic.
 * @property {integer} cost The cost of property purchase.
 * @property {integer} upgrade The cost of a house upgrade.
 * @property {integer[]} rent The cost of rent for each upgrade.
 */

export default [
	{
		id: 0,
		name: "Go",
		type: Go
	},
	{
		id: 1,
		name: "Crapper Street",
		color: Colors.BROWN,
		cost: 60,
		rent: [2, 10, 30, 90, 160, 250],
		upgrade: 50,
		type: Rentable
	},
	{
		id: 2,
		name: "Pot Luck",
		type: Luck
	},
	{
		id: 3,
		name: "Gangsters Paradise",
		color: Colors.BROWN,
		cost: 60,
		rent: [4, 20, 60, 180, 320, 450],
		upgrade: 50,
		type: Rentable
	},
	{
		id: 4,
		name: "Income Tax",
		graphic: "tax",
		cost: 100,
		type: Tax
	},
	{
		id: 5,
		name: "Brighton Station",
		group: "Station",
		cost: 200,
		type: Station
	},
	{
		id: 6,
		name: "Weeping Angel",
		color: Colors.BLUE,
		cost: 100,
		rent: [6, 30, 90, 270, 400, 550],
		upgrade: 50,
		type: Rentable
	},
	{
		id: 7,
		name: "Opportunity Knocks",
		graphic: "opportunity",
		type: Opportunity
	},
	{
		id: 8,
		name: "Potts Avenue",
		color: Colors.BLUE,
		cost: 100,
		rent: [6, 30, 90, 270, 400, 550],
		upgrade: 50,
		type: Rentable
	},
	{
		id: 9,
		name: "Nardole Drive",
		color: Colors.BLUE,
		cost: 120,
		rent: [8, 40, 100, 300, 450, 600],
		upgrade: 50,
		type: Rentable,
	},
	{
		id: 10,
		name: "Jail/Just visiting",
		type: Jail
	},
	{
		id: 11,
		name: "Skywalker Drive",
		color: Colors.PURPLE,
		cost: 140,
		rent: [10, 50, 150, 450, 625, 750],
		upgrade: 100,
		type: Rentable
	},
	{
		id: 12,
		name: "Tesla Power Co",
		graphic: "electric",
		cost: 150,
		type: Utility
	},
	{
		id: 13,
		name: "Wookie Hole",
		color: Colors.PURPLE,
		cost: 140,
		rent: [10, 50, 150, 450, 625, 750],
		upgrade: 100,
		type: Rentable
	},
	{
		id: 14,
		name: "Rey Lane",
		color: Colors.PURPLE,
		cost: 160,
		rent: [12, 60, 180, 500, 700, 900],
		upgrade: 100,
		type: Rentable
	},
	{
		id: 15,
		name: "Hove Station",
		group: "Station",
		cost: 200,
		type: Station
	},
	{
		id: 16,
		name: "Cooper Drive",
		color: Colors.ORANGE,
		cost: 180,
		rent: [14, 70, 200, 550, 750, 950],
		upgrade: 100,
		type: Rentable
	},
	{
		id: 17,
		name: "Pot Luck",
		type: Luck
	},
	{
		id: 18,
		name: "Wolowitz Street",
		color: Colors.ORANGE,
		cost: 180,
		rent: [14, 70, 200, 550, 750, 950],
		upgrade: 100,
		type: Rentable
	},
	{
		id: 19,
		name: "Penny Lane",
		color: Colors.ORANGE,
		cost: 200,
		rent: [16, 80, 220, 600, 800, 1000],
		upgrade: 100,
		type: Rentable
	},
	{
		id: 20,
		name: "Free Parking",
		type: Parking
	},
	{
		id: 21,
		name: "Yue Fei Square",
		color: Colors.RED,
		cost: 220,
		rent: [18, 90, 250, 700, 875, 1050],
		upgrade: 150,
		type: Rentable
	},
	{
		id: 22,
		name: "Opportunity Knocks",
		graphic: "opportunity2",
		type: Opportunity
	},
	{
		id: 23,
		name: "Mulan Rouge",
		color: Colors.RED,
		cost: 220,
		rent: [18, 90, 250, 700, 875, 1050],
		upgrade: 150,
		type: Rentable
	},
	{
		id: 24,
		name: "Han Xin Gardens",
		color: Colors.RED,
		cost: 240,
		rent: [20, 100, 300, 750, 925, 1100],
		upgrade: 150,
		type: Rentable
	},
	{
		id: 25,
		name: "Falmer Station",
		group: "Station",
		cost: 200,
		type: Station
	},
	{
		id: 26,
		name: "Kirk Close",
		color: Colors.YELLOW,
		cost: 260,
		rent: [22, 110, 330, 800, 975, 1150],
		upgrade: 150,
		type: Rentable
	},
	{
		id: 27,
		name: "Picard Avenue",
		color: Colors.YELLOW,
		cost: 260,
		rent: [22, 110, 330, 800, 975, 1150],
		upgrade: 150,
		type: Rentable
	},
	{
		id: 28,
		name: "Edison Water",
		cost: 150,
		graphic: "water",
		type: Utility
	},
	{
		id: 29,
		name: "Crusher Creek",
		color: Colors.YELLOW,
		cost: 280,
		rent: [22, 120, 360, 850, 1025, 1200],
		upgrade: 150,
		type: Rentable
	},
	{
		id: 30,
		name: "Go to Jail",
		type: Cop
	},
	{
		id: 31,
		name: "Sirat Mews",
		color: Colors.GREEN,
		cost: 300,
		rent: [26, 130, 390, 900, 1100, 1275],
		upgrade: 200,
		type: Rentable
	},
	{
		id: 32,
		name: "Ghengis Crescent",
		color: Colors.GREEN,
		cost: 300,
		rent: [26, 130, 390, 900, 1100, 1275],
		upgrade: 200,
		type: Rentable
	},
	{
		id: 33,
		name: "Pot Luck",
		type: Luck
	},
	{
		id: 34,
		name: "Ibis Close",
		color: Colors.GREEN,
		cost: 320,
		rent: [28, 150, 450, 1000, 1200, 1400],
		upgrade: 200,
		type: Rentable
	},
	{
		id: 35,
		name: "Lewes Station",
		group: "Station",
		cost: 200,
		type: Station
	},
	{
		id: 36,
		name: "Opportunity Knocks",
		graphic: "opportunity3",
		type: Opportunity
	},
	{
		id: 37,
		name: "Hawking Way",
		color: Colors.DEEP_BLUE,
		cost: 350,
		rent: [35, 175, 500, 1100, 1300, 1500],
		upgrade: 200,
		type: Rentable
	},
	{
		id: 38,
		name: "Super Tax",
		graphic: "luxury",
		cost: 200,
		type: Tax
	},
	{
		id: 39,
		name: "Turing Heights",
		color: Colors.DEEP_BLUE,
		cost: 400,
		rent: [50, 200, 600, 1400, 1700, 2000],
		upgrade: 200,
		type: Rentable
	}
];
