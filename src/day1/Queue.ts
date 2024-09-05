type QueueNode<T> = {
    value: T;
    next?: QueueNode<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: QueueNode<T>;
    private tail?: QueueNode<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        this.length++;

        const node: QueueNode<T> = { value: item };

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;

        const head = this.head;
        this.head = this.head.next

        //free
        head.next=undefined

        if(this.length===0){
            this.tail = undefined
        }

        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}