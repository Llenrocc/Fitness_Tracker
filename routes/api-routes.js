const db = require("../models");


module.exports = function (app) {

    //comment in to pre-populate database
    // db.Workout.find({}).then(function (res) {
    //     console.log("Checking if db is populated");
    //     if (res.length === 0) {
    //         console.log("DB is empty");
    //         require("./seeders/seed.js");
    //     }
    // });

    //get workouts
    app.get("/api/workouts", (req, res) => {

        db.Workouts.find({}).then(dbWorkouts => {
            dbWorkouts.forEach(workouts => {
                var total = 0;
                workouts.exercises.forEach(e => {
                    total += e.duration;
                });
                workout.totalDuration = total;

            });

            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // add exercise
    app.put("/api/workouts/:id", (req, res) => {

        db.Workouts.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { totalDuration: req.body.duration },
                $push: { exercises: req.body }
            },
            { new: true }).then(dbWorkouts => {
                res.json(dbWorkouts);
            }).catch(err => {
                res.json(err);
            });

    });

    //create workout
    app.post("/api/workouts", ({ body }, res) => {
        // console.log("WORKOUT TO BE ADDED");
        // console.log(body);

        db.Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

    // get workouts in range
    app.get("/api/workouts/range", (req, res) => {

        db.Workout.find({}).then(dbWorkout => {
            console.log("ALL WORKOUTS");
            console.log(dbWorkout);

            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

    });


}