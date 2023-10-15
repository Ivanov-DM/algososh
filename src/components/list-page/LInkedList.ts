import {LinkedListNode} from "./LinkedListNode";

interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    getSize: () => number;
    toArray: () => Array<T>;
    print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null;
    private size: number;

    constructor(initArr?: Array<T>) {
        this.head = null;
        this.size = 0;
        if (initArr) {
            initArr.forEach(el => this.append(el));
        }
    }

    append(element: T) {
        const node = new LinkedListNode(element);
        if (this.head === null) {
            this.head = node
        } else {
            let currentNode = this.head
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node
        }
        this.size++;
    }

    prepend(element: T) {
        const node = new LinkedListNode(element);
        if (this.head === null) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }

    addByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            return;
        } else {
            const node = new LinkedListNode(element);
            if (index === 0) {
                this.prepend(element);
            } else {
                let current = this.head;
                let currentIndex = 0;
                while (index - 1 !== currentIndex) {
                    current = current!.next;
                    currentIndex++;
                }
                if (current) {
                    node.next = current.next;
                    current.next = node;
                }
            }
            this.size++;
        }
    }

    deleteByIndex(index: number) {
        if (index < 0 || index >= this.size) {
            return;
        } else {
            let current;
            if (index === 0) {
                if (this.head) {
                    current = this.head.next;
                    this.head = current;
                }
            } else {
                current = this.head;
                let currentIndex = 0;
                while (index - 1 !== currentIndex) {
                    current = current!.next;
                    currentIndex++;
                }
                if (current) {
                    if (current.next) {
                        current.next = current.next?.next;
                    } else {
                        current.next = null
                    }
                }
            }
            this.size--;
        }
    }

    deleteHead() {
        if (!this.head) {
            return;
        }
        this.head = this.head.next;
        this.size--;
    }

    deleteTail() {
        if (!this.head) {
            return;
        }
        if (!this.head.next) {
            this.head = null;
            this.size--;
        } else {
            let current = this.head;
            while (current.next?.next) {
                current = current.next;
            }
            current.next = null;
            this.size--;
        }
    }

    toArray() {
        const arr: T[] = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }

    getSize() {
        return this.size;
    }

    print() {
        let curr = this.head;
        let res = '';
        while (curr) {
            res += `${curr.value} `;
            curr = curr.next;
        }
        console.log(res);
    }
}