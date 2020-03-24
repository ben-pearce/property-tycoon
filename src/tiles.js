import Go from "./tycoon/tiles/go";
import Jail from "./tycoon/tiles/jail";

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
		buy: false,
		action: "Collect \u00a3200",
		type: Go
	},
	{
		id: 1,
		name: "Crapper Street",
		buy: true,
		group: "Brown",
		cost: 60,
		rent: [2, 10, 30, 90, 160, 250],
		type: Rentable
	},
	{
		id: 2,
		name: "Pot Luck",
		buy: false,
		action: "Take card",
		type: Luck
	},
	{
		id: 3,
		name: "Gangsters Paradise",
		buy: true,
		group: "Brown",
		cost: 60,
		rent: [4, 20, 60, 180, 320, 450],
		type: Rentable
	},
	{
		id: 4,
		name: "Income Tax",
		buy: false,
		action: "Pay \u00a3200",
		type: Tax
	},
	{
		id: 5,
		name: "Brighton Station",
		buy: true,
		group: "Station",
		cost: 200,
		type: Station
	},
	{
		id: 6,
		name: "Weeping Angel",
		buy: true,
		group: "Blue",
		cost: 100,
		rent: [6, 30, 90, 270, 400, 550],
		type: Rentable
	},
	{
		id: 7,
		name: "Opportunity Knocks",
		buy: false,
		action: "Take card",
		type: Opportunity
	},
	{
		id: 8,
		name: "Potts Avenue",
		buy: true,
		group: "Blue",
		cost: 100,
		rent: [6, 30, 90, 270, 400, 550],
		type: Rentable
	},
	{
		id: 9,
		name: "Nardole Drive",
		buy: true,
		group: "Blue",
		cost: 120,
		rent: [8, 40, 100, 300, 450, 600],
		type: Rentable,
	},
	{
		id: 10,
		name: "Jail/Just visiting",
		buy: false,
		action: "",
		type: Jail
	},
	{
		id: 11,
		name: "Skywalker Drive",
		buy: true,
		group: "Purple",
		cost: 140,
		rent: [10, 50, 150, 450, 625, 750],
		type: Rentable
	},
	{
		id: 12,
		name: "Tesla Power Co",
		buy: true,
		group: "Utilities",
		cost: 150,
		type: Utility
	},
	{
		id: 13,
		name: "Wookie Hole",
		buy: true,
		group: "Purple",
		cost: 140,
		rent: [10, 50, 150, 450, 625, 750],
		type: Rentable
	},
	{
		id: 14,
		name: "Rey Lane",
		buy: true,
		group: "Purple",
		cost: 160,
		rent: [12, 60, 180, 500, 700, 900],
		type: Rentable
	},
	{
		id: 15,
		name: "Hove Station",
		buy: true,
		group: "Station",
		cost: 200,
		type: Station
	},
	{
		id: 16,
		name: "Cooper Drive",
		buy: true,
		group: "Orange",
		cost: 180,
		rent: [14, 70, 200, 550, 750, 950],
		type: Rentable
	},
	{
		id: 17,
		name: "Pot Luck",
		buy: false,
		action: "Take card",
		type: Luck
	},
	{
		id: 18,
		name: "Wolowitz Street",
		buy: true,
		group: "Orange",
		cost: 180,
		rent: [14, 70, 200, 550, 750, 950],
		type: Rentable
	},
	{
		id: 19,
		name: "Penny Lane",
		buy: true,
		group: "Orange",
		cost: 200,
		rent: [16, 80, 220, 600, 800, 1000],
		type: Rentable
	},
	{
		id: 20,
		name: "Free Parking",
		buy: false,
		action: "Collect fines",
		type: Parking
	},
	{
		id: 21,
		name: "Yue Fei Square",
		buy: true,
		group: "Red",
		cost: 220,
		rent: [18, 90, 250, 700, 875, 1050],
		type: Rentable
	},
	{
		id: 22,
		name: "Opportunity Knocks",
		buy: false,
		action: "Take card",
		type: Opportunity
	},
	{
		id: 23,
		name: "Mulan Rouge",
		buy: true,
		group: "Red",
		cost: 220,
		rent: [18, 90, 250, 700, 875, 1050],
		type: Rentable
	},
	{
		id: 24,
		name: "Han Xin Gardens",
		buy: true,
		group: "Red",
		cost: 240,
		rent: [20, 100, 300, 750, 925, 1100],
		type: Rentable
	},
	{
		id: 25,
		name: "Falmer Station",
		buy: true,
		group: "Station",
		cost: 200,
		type: Rentable
	},
	{
		id: 26,
		name: "Kirk Close",
		buy: true,
		group: "Yellow",
		cost: 260,
		rent: [22, 110, 330, 800, 975, 1150],
		type: Rentable
	},
	{
		id: 27,
		name: "Picard Avenue",
		buy: true,
		group: "Yellow",
		cost: 260,
		rent: [22, 110, 330, 800, 975, 1150],
		type: Rentable
	},
	{
		id: 28,
		name: "Edison Water",
		buy: true,
		group: "Utilities",
		cost: 150,
		type: Utility
	},
	{
		id: 29,
		name: "Crusher Creek",
		buy: true,
		group: "Yellow",
		cost: 280,
		rent: [22, 120, 360, 850, 1025, 1200],
		type: Utility
	},
	{
		id: 30,
		name: "Go to Jail",
		buy: false,
		action: "",
		type: Jail
	},
	{
		id: 31,
		name: "Sirat Mews",
		buy: true,
		group: "Green",
		cost: 300,
		rent: [26, 130, 390, 900, 1100, 1275],
		type: Rentable
	},
	{
		id: 32,
		name: "Ghengis Crescent",
		buy: true,
		group: "Green",
		cost: 300,
		rent: [26, 130, 390, 900, 1100, 1275],
		type: Rentable
	},
	{
		id: 33,
		name: "Pot Luck",
		buy: false,
		action: "Take card",
		type: Luck
	},
	{
		id: 34,
		name: "Ibis Close",
		buy: true,
		group: "Green",
		cost: 320,
		rent: [28, 150, 450, 1000, 1200, 1400],
		type: Rentable
	},
	{
		id: 35,
		name: "Lewes Station",
		buy: true,
		group: "Station",
		cost: 200,
		type: Station
	},
	{
		id: 36,
		name: "Opportunity Knocks",
		buy: false,
		action: "",
		type: Opportunity
	},
	{
		id: 37,
		name: "Hawking Way",
		buy: true,
		group: "Deep blue",
		cost: 350,
		rent: [35, 175, 500, 1100, 1300, 1500],
		type: Rentable
	},
	{
		id: 38,
		name: "Super Tax",
		buy: false,
		action: "Pay \u00a3100",
		type: Tax
	},
	{
		id: 39,
		name: "Turing Heights",
		buy: true,
		group: "Deep blue",
		cost: 400,
		rent: [50, 200, 600, 1400, 1700, 2000],
		type: Rentable
	}
];
