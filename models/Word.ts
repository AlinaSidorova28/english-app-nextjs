export default class Word {
    constructor(
        public id: string = '',
        public title: string = '',
        public price: number = 0,
        public currency: string = 'USD',
        public storage: number = 0,
        public manufacturer: string = '',
        public in_stock: boolean = false,
        public last_update: string = '',
    ) {}
}
