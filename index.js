const express = require("express");
const mongoose = require("mongoose");
const { findByIdAndDelete } = require("./models/schema");
const event = require("./models/schema");
const app = express();
const PORT = 8060;
const URL = `mongodb+srv://admin:admin@cluster0.nlkjv4r.mongodb.net/?retryWrites=true&w=majority`

app.use(express.json());

mongoose.connect(URL).then((success) => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err, "error");
}).finally(() => {
    console.log("finally working");
})

app.get('/', (req, res) => {
    res.send("app started")
})

app.post('/v1/events', async (req, res) => {
    try {
        const { title, description, location, startTime, endTime } = req.body
        console.log(req.body);
        if (!title) {
            return res.status(400).json({
                error: "Validtion error title is required"
            })
        }
        if (!description) {
            return res.status(400).json({
                error: "Validtion error description is required"
            })
        }
        if (!location) {
            return res.status(400).json({
                error: "Validtion error location is required"
            })
        }
        if (!startTime) {
            return res.status(400).json({
                error: "Validtion error start-time is required"
            })
        }
        if (!endTime) {
            return res.status(400).json({
                error: "Validtion error end-time is required"
            })
        }
        const data = await event.create(req.body);
        return res.json({
            data
        })
    } catch (e) {
       return res.status(400).json({
            status: "failed",
            message: `data not created ${e}`
        })
    }
})

app.get('/v1/events', async (req, res) => {
    try {
        const data = await event.find();
       return res.json({
            data
        })
    } catch (e) {
       return res.json({
            status: "failed",
            message: `something went wrong ${data}`
        })
    }
})

app.get('/v1/events/:id', async (req, res) => {
    try {
        const data = await event.findById({ _id: req.params.id })
        // const time = data.startTime.toDate()
        // console.log(time);
        console.log(data.startTime);
        if (data == null) {
            return res.status(404).json({
                message: "there is no event with that id"
            })
        }
        return res.json({
            data
        })
    } catch (e) {
        return res.status(404).json({
            message: "there is no event with that id"
        })
    }
})

app.delete('/v1/events/:id', async (req, res) => {
    try {
        const data = await event.findByIdAndDelete({ _id: req.params.id })
        res.status(204);
        res.end();
    } catch (e) {
        res.status(204);
        res.end();
        console.log(`not delted ${e}`);
    }
})

app.put('/v1/events/:id', async (req, res) => {
    try {
        const { title, description, location, startTime, endTime } = req.body
        console.log(req.body);
        if (!title) {
            return res.status(400).json({
                error: "Validtion error title is required"
            })
        }
        if (!description) {
            return res.status(400).json({
                error: "Validtion error description is required"
            })
        }
        if (!location) {
            return res.status(400).json({
                error: "Validtion error location is required"
            })
        }
        if (!startTime) {
            return res.status(400).json({
                error: "Validtion error start-time is required"
            })
        }
        if (!endTime) {
            return res.status(400).json({
                error: "Validtion error end-time is required"
            })
        }
        const data = await event.updateOne({ _id: req.params.id }, req.body)
        const obj = await event.findOne({_id : req.params.id})
        return res.json({
            obj
        })
    } catch (e) {
        return res.status(401).json({
            message: "can't update data"
        })
    }
})

app.listen(PORT, () => console.log(`App listening at ${PORT}`));


