import AllPlayersPayPlayer from "./tycoon/actions/allPlayersPayPlayer";
import BankPayPlayer from "./tycoon/actions/bankPayPlayer";
import FineOrOpportunity from "./tycoon/actions/fineOrOpportunity";
import GetOutOfJail from "./tycoon/actions/getOutOfJail";
import PlayerGoToJail from "./tycoon/actions/playerGoToJail";
import PlayerMove from "./tycoon/actions/playerMove";
import PlayerMoveToTile from "./tycoon/actions/playerMoveToTile";
import PlayerPayBank from "./tycoon/actions/playerPayBank";
import PlayerPayFine from "./tycoon/actions/playerPayFine";
import PlayerPayRepair from "./tycoon/actions/playerPayRepair";

/**
 * @typedef {Object} CardConfig
 * @property {string} name The name of the card.
 * @property {string} description The description of the action.
 * @property {BaseAction} action The action instance.
 */

export default {
	potluck: [
		{
			name: "You inherit £100",
			description: "Bank pays player £100.",
			action: new BankPayPlayer(100)
		},
		{
			name: "You have won 2nd prize in a beauty contest, collect £20",
			description: "Bank pays player £20.",
			action: new BankPayPlayer(20)
		},
		{
			name: "Go back to Crapper Street",
			description: "Player token moves backwards to Crapper Street.",
			action: new PlayerMoveToTile(1, -1)
		},
		{
			name: "Student loan refund. Collect £20",
			description: "Bank pays player £20.",
			action: new BankPayPlayer(20)
		},
		{
			name: "Bank error in your favour. Collect £200",
			description: "Bank pays player £200.",
			action: new BankPayPlayer(200)
		},
		{
			name: "Pay bill for text books of £100",
			description: "Player pays £100 to the bank.",
			action: new PlayerPayBank(100)
		},
		{
			name: "Mega late night taxi bill pay £50",
			description: "Player pays £50 to the bank.",
			action: new PlayerPayBank(50)
		},
		{
			name: "Advance to go",
			description: "Player moves forwards to GO.",
			action: new PlayerMoveToTile(0)
		},
		{
			name: "From sale of Bitcoin you get £50",
			description: "Bank pays player £50.",
			action: new BankPayPlayer(50)
		},
		{
			name: "Pay a £10 fine or take opportunity knocks",
			description: "If fine paid, player puts £10 on free parking.",
			action: new FineOrOpportunity(10)
		},
		{
			name: "Pay insurance fee of £50",
			description: "Player puts £50 on free parking.",
			action: new PlayerPayFine(50)
		},
		{
			name: "Savings bond matures, collect £100",
			description: "Bank pays £100 to the player.",
			action: new BankPayPlayer(100)
		},
		{
			name: "Go to jail. Do not pass GO, do not collect £200",
			description: "As the card says.",
			action: new PlayerGoToJail()
		},
		{
			name: "Received interest on shares of £25",
			description: "Bank pays player £25.",
			action: new BankPayPlayer(25)
		},
		{
			name: "It's your birthday. Collect £10 from each player",
			description: "Player receives £10 from each player.",
			action: new AllPlayersPayPlayer(10)
		},
		{
			name: "Get out of jail free",
			description: "Retained by the player until needed. No resale or trade value.",
			action: new GetOutOfJail()
		}],
	opportunity: [
		{
			name: "Bank pays you dividend of £50",
			description: "Bank pays player £50.",
			action: new BankPayPlayer(50)
		},
		{
			name: "You have won a lip sync battle. Collect £100",
			description: "Bank pays player £100.",
			action: new BankPayPlayer(100)
		},
		{
			name: "Advance to Turing Heights",
			description: "Player token moves forwards to Turing Heights.",
			action: new PlayerMoveToTile(39)
		},
		{
			name: "Advance to Han Xin Gardens. If you pass GO, collect £200",
			description: "Player moves token.",
			action: new PlayerMoveToTile(24)
		},
		{
			name: "Fined £15 for speeding",
			description: "Player puts £15 on free parking.",
			action: new PlayerPayFine(15)
		},
		{
			name: "Pay university fees of £150",
			description: "Player pays £150 to the bank.",
			action: new PlayerPayBank(150)
	
		},
		{
			name: "Take a trip to Hove station. If you pass GO collect £200",
			description: "Player moves token.",
			action: new PlayerMoveToTile(15)
		},
		{
			name: "Loan matures, collect £150",
			description: "Bank pays £150 to the player.",
			action: new BankPayPlayer(150)
		},
		{
			name: "You are assessed for repairs, £40/house, £115/hotel",
			description: "Player pays money to the bank.",
			action: new PlayerPayRepair(40, 115)
		},
		{
			name: "Advance to GO",
			description: "Player moves token.",
			action: new PlayerMoveToTile(0)
		},
		{
			name: "You are assessed for repairs, £25/house, £100/hotel",
			description: "Player pays money to the bank.",
			action: new PlayerPayRepair(25, 100)
		},
		{
			name: "Go back 3 spaces",
			description: "Player moves token.",
			action: new PlayerMove(3, -1)
		},
		{
			name: "Advance to Skywalker Drive. If you pass GO collect £200",
			description: "Player moves token.",
			action: new PlayerMoveToTile(11)
		},
		{
			name: "Go to jail. Do not pass GO, do not collect £200",
			description: "As the card says.",
			action: new PlayerGoToJail()
		},
		{
			name: "Drunk in charge of a skateboard. Fine £20",
			description: "Player puts £20 on free parking.",
			action: new PlayerPayFine(20)
		},
		{
			name: "Get out of jail free",
			description: "Retained by the player until needed. No resale or trade value.",
			action: new GetOutOfJail()
		}]
};
