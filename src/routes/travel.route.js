const { Router } = require("express");
const { showTours, createTour, findTour } = require("../controllers/travel.controller");
const route = Router();

route.get("/show", showTours);
route.post("/createtour", createTour)
route.get("/findtour", findTour);


module.exports = route;


