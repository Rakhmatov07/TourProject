class Tour{
    constructor(id, name, price, startDate, duration){
        this.id = id;
        this.name = name;
        this.price = price;
        this.startDate = startDate;
        this.duration = duration;
        this.createdAt = new Date();
    }
}

module.exports = Tour;