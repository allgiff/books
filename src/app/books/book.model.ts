export class Book {
    subscribe(arg0: (bookData: any) => void) {
      throw new Error('Method not implemented.');
    }
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public imageUrl: string
    ) {}

}