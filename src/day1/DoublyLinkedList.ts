class ListNode<T> {
    value: T;
    next: ListNode<T> | null;
    prev: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export default class DoublyLinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    public length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    getHead(): T | null {
        return this.head ? this.head.value : null;
    }

    getTail(): T | null {
        return this.tail ? this.tail.value : null;
    }

    prepend(item: T): void {
        const newNode = new ListNode(item);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    append(item: T): void {
        const newNode = new ListNode(item);
        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    insertAt(item: T, index: number): boolean {
        if (index < 0 || index > this.length) {
            return false;
        }

        if (index === 0) {
            this.prepend(item);
            return true;
        }

        if (index === this.length) {
            this.append(item);
            return true;
        }

        const newNode = new ListNode(item);
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current!.next;
        }
        newNode.next = current!.next;
        newNode.prev = current;
        current!.next!.prev = newNode;
        current!.next = newNode;
        this.length++;
        return true;
    }

    remove(item: T): T | undefined {
        let current = this.head;
        while (current) {
            if (current.value === item) {
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) {
                        this.head.prev = null;
                    } else {
                        this.tail = null;
                    }
                } else if (current === this.tail) {
                    this.tail = current.prev;
                    this.tail!.next = null;
                } else {
                    current.prev!.next = current.next;
                    current.next!.prev = current.prev;
                }
                this.length--;
                return current.value;
            }
            current = current.next;
        }
        return undefined;
    }

    get(index: number): T | undefined {
        if (index < 0 || index >= this.length) {
            return undefined;
        }

        let current: ListNode<T>;
        if (index <= this.length / 2) {
            current = this.head!;
            for (let i = 0; i < index; i++) {
                current = current.next!;
            }
        } else {
            current = this.tail!;
            for (let i = this.length - 1; i > index; i--) {
                current = current.prev!;
            }
        }
        return current.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let removedNode: ListNode<T>;
        if (idx === 0) {
            removedNode = this.head!;
            this.head = this.head!.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
        } else if (idx === this.length - 1) {
            removedNode = this.tail!;
            this.tail = this.tail!.prev;
            this.tail!.next = null;
        } else {
            let current: ListNode<T>;
            if (idx <= this.length / 2) {
                current = this.head!;
                for (let i = 0; i < idx; i++) {
                    current = current.next!;
                }
            } else {
                current = this.tail!;
                for (let i = this.length - 1; i > idx; i--) {
                    current = current.prev!;
                }
            }
            removedNode = current;
            current.prev!.next = current.next;
            current.next!.prev = current.prev;
        }

        this.length--;
        return removedNode.value;
    }
}