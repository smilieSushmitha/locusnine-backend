const User = require("../models/user.js");

// To Create a 
exports.createUser = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Create a new user object
    // req.body should strictly follow User Model
    const user = new User(req.body);

    // Save the object as document in MongoDb
    user.save()
        .then(
            createdUser => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'User Created SuccessFully!',
                    'user': {
                        ...createdUser._doc,
                        userId: createdUser._id
                    }
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

// To get list of Users
exports.getUsers = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Set up User query
    const UserQuery = User.find().sort({
        onDate: -1
    });
    // Execute user query
    UserQuery.then(
            users => {
                if (!users.length) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No Users found!',
                        'users': users,
                        'userCount': users.length
                    });
                }
                res.status(200).json({
                    'status': 'Success',
                    'message': 'Users Fetched Successfully!',
                    'users': users,
                    'userCount': users.length
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}


// To get a specific User
exports.getUser = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Get User Id to modify
    const userId = req.params.userId;

    // Execute user query
    User.findOne({
            _id: userId
        })
        .then(
            user => {
                if (!user) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No User found with that Id!',
                        'user': user
                    });
                }
                res.status(200).json({
                    'status': 'Success',
                    'message': 'User Fetched Successfully!',
                    'user': user
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

// To Update a User
exports.updateUser = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Get User Id to modify
    const userId = req.params.userId;

    // Get Data to be modified
    const data = req.body;

    // Execute Update
    User.findOneAndUpdate({
            _id: userId
        }, {
            ...data,
            'timestamps.modifiedOn': Date.now()
        }, {
            new: true
        })
        .then(
            updatedUser => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'User Updated Successfully!',
                    'user': updatedUser
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}


// To Delete a User
exports.deleteUser = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Get User Id to delete
    const userId = req.params.userId;

    // Execute Update
    User.findOneAndDelete({
            _id: userId
        })
        .then(
            deletedUser => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'User Deleted Successfully!'
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}