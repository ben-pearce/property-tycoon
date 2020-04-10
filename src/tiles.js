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

export default [
	{
		id: 0,
		name: "Go",
		type: Go
	},
	{
		id: 1,
		name: "Crapper Street",
		group: "Brown",
		cost: 60,
		rent: [2, 10, 30, 90, 160, 250],
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
		group: "Brown",
		cost: 60,
		rent: [4, 20, 60, 180, 320, 450],
		type: Rentable
	},
	{
		id: 4,
		name: "Income Tax",
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
		group: "Blue",
		cost: 100,
		rent: [6, 30, 90, 270, 400, 550],
		type: Rentable
	},
	{
		id: 7,
		name: "Opportunity Knocks",
		type: Opportunity
	},
	{
		id: 8,
		name: "Potts Avenue",
		group: "Blue",
		cost: 100,
		rent: [6, 30, 90, 270, 400, 550],
		type: Rentable
	},
	{
		id: 9,
		name: "Nardole Drive",
		group: "Blue",
		cost: 120,
		rent: [8, 40, 100, 300, 450, 600],
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
		group: "Purple",
		cost: 140,
		rent: [10, 50, 150, 450, 625, 750],
		type: Rentable
	},
	{
		id: 12,
		name: "Tesla Power Co",
		group: "Utilities",
		cost: 150,
		type: Utility
	},
	{
		id: 13,
		name: "Wookie Hole",
		group: "Purple",
		cost: 140,
		rent: [10, 50, 150, 450, 625, 750],
		type: Rentable
	},
	{
		id: 14,
		name: "Rey Lane",
		group: "Purple",
		cost: 160,
		rent: [12, 60, 180, 500, 700, 900],
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
		group: "Orange",
		cost: 180,
		rent: [14, 70, 200, 550, 750, 950],
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
		group: "Orange",
		cost: 180,
		rent: [14, 70, 200, 550, 750, 950],
		type: Rentable
	},
	{
		id: 19,
		name: "Penny Lane",
		group: "Orange",
		cost: 200,
		rent: [16, 80, 220, 600, 800, 1000],
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
		group: "Red",
		cost: 220,
		rent: [18, 90, 250, 700, 875, 1050],
		type: Rentable
	},
	{
		id: 22,
		name: "Opportunity Knocks",
		type: Opportunity
	},
	{
		id: 23,
		name: "Mulan Rouge",
		group: "Red",
		cost: 220,
		rent: [18, 90, 250, 700, 875, 1050],
		type: Rentable
	},
	{
		id: 24,
		name: "Han Xin Gardens",
		group: "Red",
		cost: 240,
		rent: [20, 100, 300, 750, 925, 1100],
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
		group: "Yellow",
		cost: 260,
		rent: [22, 110, 330, 800, 975, 1150],
		type: Rentable
	},
	{
		id: 27,
		name: "Picard Avenue",
		group: "Yellow",
		cost: 260,
		rent: [22, 110, 330, 800, 975, 1150],
		type: Rentable
	},
	{
		id: 28,
		name: "Edison Water",
		group: "Utilities",
		cost: 150,
		type: Utility
	},
	{
		id: 29,
		name: "Crusher Creek",
		group: "Yellow",
		cost: 280,
		rent: [22, 120, 360, 850, 1025, 1200],
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
		group: "Green",
		cost: 300,
		rent: [26, 130, 390, 900, 1100, 1275],
		type: Rentable
	},
	{
		id: 32,
		name: "Ghengis Crescent",
		group: "Green",
		cost: 300,
		rent: [26, 130, 390, 900, 1100, 1275],
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
		group: "Green",
		cost: 320,
		rent: [28, 150, 450, 1000, 1200, 1400],
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
		type: Opportunity
	},
	{
		id: 37,
		name: "Hawking Way",
		group: "Deep blue",
		cost: 350,
		rent: [35, 175, 500, 1100, 1300, 1500],
		type: Rentable
	},
	{
		id: 38,
		name: "Super Tax",
		cost: 200,
		type: Tax
	},
	{
		id: 39,
		name: "Turing Heights",
		group: "Deep blue",
		cost: 400,
		rent: [50, 200, 600, 1400, 1700, 2000],
		type: Rentable
	}
];
