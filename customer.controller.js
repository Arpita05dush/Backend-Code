const Customer = require('./customer.model.js');
//const Add = require('./customer.model.js');
//Create new Customer
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Customer content can not be empty"
        });
    }

    // Create a Customer
  const customer = new Customer({
  // const add = new Add({
        name: req.body.name || "No customer name",
        emailid: req.body.emailid,
        phone: req.body.phone,
        address: req.body.address
    });

    // Save Customer in the database
   customer.save(
//add.save(
   )
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the customer."
            });
        });
};

// Retrieve all customers from the database.
exports.findAll = (req, res) => {
    Customer.find()
        .then(customers => {
            res.send(customers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving customers."
            });
        });
};

// Find a single customer with a customertId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.customerId
                });
            }
            res.send(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving customer with id " + req.params.customerId
            });
        });
};

// Update a customer
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Customer content can not be empty"
        });
    }

    // Find and update customer with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        name: req.body.name,
        emailid:req.body.emailid,
        phone:req.body.phone,
        address:req.body.address
        
    }, { new: true })
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            res.send(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.customerId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            res.send({ message: "Customer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            return res.status(500).send({
                message: "Could not delete customer with id " + req.params.customerId
            });
        });
};