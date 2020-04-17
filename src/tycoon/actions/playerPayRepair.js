import PlayerPayBank from "./playerPayBank";


class PlayerPayRepair extends PlayerPayBank {
	constructor(houseCost, hotelCost) {
		super(null);

		this.houseCost = houseCost;
		this.hotelCost = hotelCost;
	}

	do(game, player) {
		// conditionally update cost
		super.do(game, player);

		this.cash = null;
	}
}

export default PlayerPayRepair;