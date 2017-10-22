export class DeleteEvent {
    id: number;
    name: string;
    type: string;

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setType(type: string) {
        this.type = type;
    }

    getType() {
        return this.type;
    }
}
