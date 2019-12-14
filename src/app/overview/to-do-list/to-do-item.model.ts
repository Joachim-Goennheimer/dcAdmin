export class TodoItem {
    _id: number;
    title = '';
    marked = false;

    constructor(values: object = {}) {
      Object.assign(this, values);
    }
}
