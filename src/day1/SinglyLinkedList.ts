class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    getHead(): T | null {
        return this.head ? this.head?.value : null;
    }
    getTail(): T | null {
        return this.tail ? this.tail?.value : null;
    }
    prepend(item: T): void {
        const newNode = new ListNode(item);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
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
          current!.next = newNode;
          this.length++;
          return true;
    }
    append(item: T): void {
        const newNode = new ListNode(item);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }
    remove(item: T): T | undefined {
        if (!this.head) {
            return undefined;
          }

          if (this.head.value === item) {
            this.head = this.head.next;
            this.length--;
            if (this.length === 0) {
              this.tail = null;
            }
            return item;
          }

          let current = this.head;
          while (current.next) {
            if (current.next.value === item) {
              current.next = current.next.next;
              this.length--;
              if (!current.next) {
                this.tail = current;
              }
              return item;
            }
            current = current.next;
          }

          return undefined;
    }
    get(index: number): T | undefined {
        if (index < 0 || index >= this.length) {
            return undefined;
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current!.next;
        }
        return current!.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let removedNode: ListNode<T>;

        if (idx === 0) {
            removedNode = this.head!;
            this.head = this.head!.next;
            if (this.length === 1) {
                this.tail = null;
            }
        } else {
            let current = this.head;
            for (let i = 0; i < idx - 1; i++) {
                current = current!.next;
            }
            removedNode = current!.next!;
            current!.next = removedNode.next;
            if (idx === this.length - 1) {
                this.tail = current;
            }
        }

        this.length--;
        return removedNode.value;
    }
}
