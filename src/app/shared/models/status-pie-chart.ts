export class StatusPieChart {
    idx: number;
    name: string;
    count: number;

    constructor(i: number, name: string, count: number) {
        this.idx = i;
        this.name = name;
        this.count = count;
    }
    public increase(): void {
        this.count++;
    }
}