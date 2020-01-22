module.exports = (app) => {
    const customers = require('./customer.controller.js');
   // const adds = require('./customer.controller.js');
    // Add a new Customer
    app.post('/customers', customers.create);
  // app.post('/adds', adds.create);

    // View all Customers
    app.get('/customers', customers.findAll);
   // app.get('/Customer', customer.findAll)

    // Retrieve a single Customer with customerId
    app.get('/customers/:customerId', customers.findOne);

    // Update a Note with customerId
    app.put('/customers/:customerId', customers.update);

    // Delete a Note with customerId
    app.delete('/customers/:customerId', customers.delete);
}