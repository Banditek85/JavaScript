class Car {
    model: string;
    color: string;
    make_year: number;

    constructor(model :string, color :string, make_year :number) {
        this.model = model;
        this.color = color;
        this.make_year = make_year;
    }

    info() {
        return `Model is ${this.model}, color is ${this.color}, and it was built in ${this.make_year}`;
    }
}

let Porsche = new Car('Porsche', 'Red', 1984);
let PInfo :string = Porsche.info();

console.log(PInfo);