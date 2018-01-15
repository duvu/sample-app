export class StatusPieChart {
    name: string;
    count: number;

    constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
    }
    public increase(): void {
        this.count++;
    }
}