const IO = require("../utils/io");
const Model = require("../models/travel.model");
const {v4: uuid} = require("uuid");
const { validateTour, validateTravelPlan } = require("../validation/validate");
const TokenID = require("../utils/tokenID");
const addDays = require("./addDays");
const JWT_Secret_Key = process.env.JWT_Secret_Key;
const TokenId = new TokenID(JWT_Secret_Key);
const Tour = new IO("./database/tours.json");

const showTours = async(req, res) => {
        // read tours from database and send OK response with 200 status
    const tours = await Tour.read();
    res.status(200).json({message: "Success", tours});
}

const createTour = async(req, res) => {
    try{
            // Read elements
        const tours = await Tour.read();
        const { name, price, startDate, duration } = req.body;
            // Create id
        const id = uuid();
            // Validate new Tour
        validateTour(name, price, startDate, duration, res);
            // if passed validation create new Tour
        const newTour = new Model(id, name, price, startDate, duration);
            // add new Tour to tours 
        const data = tours.length ? [...tours, newTour] : [newTour];
            // if new Tour does not exist write to database
        const exist = tours.find((data) => { return (newTour.name === data.name && newTour.price === data.price && newTour.startDate === data.startDate && newTour.duration === data.duration)});
        if(exist) {
            return res.status(500).json({message: "Already exist"});
        }
        await Tour.write(data);
            // Create appropriate token to id
        const token = await TokenId.getToken(id);
            // Send created response with 201 status
        res.status(201).json({message: "Created", token});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const findTour = async(req, res) => {
    try{
            // Read elements
        const tours = await Tour.read();
        const { price, startDate, duration } = req.body;
            // Validate Travel Plan
        validateTravelPlan(price, startDate, duration, res)
            // End date of user's vacation
        const endDateOfUser = addDays(startDate, duration); 
        const usersMoney = parseFloat(price.replace(/[^0-9.-]+/g, ""));
        const yourTours = [];

        for(let i = 0; i < tours.length; i++){
            const endDateOfTour = addDays(tours[i].startDate, tours[i].duration);
            const tourPrice = parseFloat(tours[i]["price"].replace(/[^0-9.-]+/g, ""));
            // Find appropriate Tours through checking "price, startDate, duration"
            if(tourPrice <= usersMoney && tours[i].startDate >= startDate && endDateOfTour <= endDateOfUser){
                yourTours.push(tours[i]);
            }
        };
        yourTours.length !== 0 ? res.status(200).json({message: "Available Tours", yourTours}) : res.status(404).json({message: "Not Found"});
    }catch(error) {
        res.status(500).json({error: error.message});
    }

    
}

module.exports = {
    showTours,
    createTour,
    findTour,
}