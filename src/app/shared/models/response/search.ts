export class Search {
    column: string;
    content: string;

    constructor(column?: string, content?: string) {
        this.column = column;
        this.content = content;
    }
}
