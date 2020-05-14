import Phaser from "phaser";
class Bank extends Phaser.GameObjects.Sprite{
	constructor(board) {
        super(board.scene,0,0,"bank");

        this.board = board;
        this.scene = board.scene;
        this.spent = 0;
        this.bank_money = 50000;

    }
    deposit(sum) {
        this.bank_money += sum;
    }


    withdraw(sum) {
        this.spent = sum;
        this.bank_money -= sum;

    }




}

module.exports = Bank;
