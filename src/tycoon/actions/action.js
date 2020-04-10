class BaseAction {
	do() {
		throw new Error("Child class has not implemented method do()");
	}
}

export default BaseAction;