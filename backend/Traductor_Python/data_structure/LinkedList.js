class LinkedList {
    constructor() {
        this.head = null; //First element of the List
        this.tail = null; //Last element of the List
        this.count = 0;
    }

    append(value) {
        const newNode = { value: value, next: null, count: this.count };

        if (this.tail) {
            this.tail.next = newNode;
        }

        this.tail = newNode;

        if (!this.head) {
            this.head = newNode;
        }
        this.count++;

    }

    toArray() {
        const elements = [];

        let curNode = this.head

        while (curNode) {
            elements.push(curNode.value);
            curNode = curNode.next
        }
        return elements;
    }

    prepend(value) {
        const newNode = { value: value, next: this.head, count: this.count };

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }
    }

    delete(value) {
        if (!this.head) {
            return;
        }

        while (this.head && this.head.count === value) {
            this.head = this.head.next;
        }

        let curNode = this.head;

        while (curNode.next) {
            if (curNode.next.count === value) {
                curNode.next = curNode.next.next;
            } else {
                curNode = curNode.next
            }
        }

        if (this.tail.count === value) {
            this.tail = curNode;
        }
        this.count--;
    }

    deleteAll() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    find(value) {
        if (!this.head) {
            return null;
        }

        let curNode = this.head;

        while (curNode) {
            if (curNode.value === value) {
                return curNode
            }
            curNode = curNode.next;
        }
        return null
    }

    insertAfter(value, afterValue) {
        const existingNode = this.find(afterValue)

        if (existingNode) {
            const newNode = { value: value, next: existingNode.next };

            existingNode.next = newNode;

        }
    }

    print() {
        for (let index = 0; index < this.toArray().length; index++) {
            const element = this.toArray()[index];
            console.log(element.toString());
        }
    }

}

module.exports = LinkedList;