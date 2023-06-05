const addDays = (startDate, duration) => {
    const startDate1 = new Date(startDate); // Example start date
    
    // Create a new Date object based on the start date
    const endDate = new Date(startDate1.getTime() + duration * 24 * 60 * 60 * 1000);
    
    const endDateFormatted = endDate.toISOString().split('T')[0]; // Example output: 2023-07-03
    
    return endDateFormatted;
    
}

module.exports = addDays;