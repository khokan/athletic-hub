require("dotenv").config(); // if you don't use data can't be access fron .env file
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express(); // create express app
const port = process.env.PORT || 5000;

//MiddleWare
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // set cookie-parser

var admin = require("firebase-admin");

var serviceAccount = require("./firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(
  cors({
    origin: `${process.env.NODE_CLIENT_URL}`,
    credentials: true, // Allow cookies or auth headers
  })
); // for cross-origin

// jwt token related api
// const jwt = require("jsonwebtoken");
// app.post("/jwt", async (req, res) => {
//   const { email } = req.body;
//   const user = { email };
//   const token = await jwt.sign(user, process.env.JWT_ACCESS_TOKEN, {
//     expiresIn: "1d",
//   });

//   // set token in the cookies
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: false,
//   });

//   res.send({ success: true });
//   // res.send({ token }); // will send if local storage is used in client side
// });

// const logger = (req, res, next) => {
//   console.log("logger in the middleware");
//   next();
// };

// const verifyToken = (req, res, next) => {
//   const token = req?.cookies?.token;

//   if (!token) {
//     res.status(401).send({ message: "unauthorozed access" });
//   }

//   jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
//     if (err) res.status(401).send({ message: "unauthorized access2" });
//     req.decoded = decoded;
//     next();
//   });
// };
const verifyToken = (req, res, next) => {
  if (req.query.email !== req.decoded?.email)
    return res.status(403).send({ message: "forbidden access" });
  next();
};

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).send({ message: "unauthorozed access header" });

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "unauthorozed access token" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "unauthorozed access" });
  }
};

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello from athletic hub server ..");
});

const uri = `mongodb+srv://${process.env.DB_USER_ATHLETIC}:${process.env.DB_PASS_ATHLETIC}@cluster0.vqav3xl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    const eventsCollection = client.db("atheleticHub").collection("events");
    const bookingsCollection = client.db("atheleticHub").collection("bookings");

    // GET all events
    app.get("/events", async (req, res) => {
      const query = {};
      const email = req.query.email;
      if (email) query.creatorEmail = email;
      const result = await eventsCollection.find(query).toArray();
      res.send(result);
    });

    // GET all events for management - protected route
    app.get(
      "/manageEvents",
      verifyFirebaseToken,
      verifyToken,
      async (req, res) => {
        const query = {};
        const email = req.query.email;
        if (email) query.creatorEmail = email;
        const result = await eventsCollection.find(query).toArray();
        res.send(result);
      }
    );

    // GET event by ID
    app.get("/events/:id", async (req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid coffee ID format" });
      }

      const query = { _id: new ObjectId(id) };
      const result = await eventsCollection.findOne(query);
      res.send(result);
    });

    // POST new event - protected route
    app.post("/events", verifyFirebaseToken, async (req, res) => {
      const newJob = req.body;
      const result = await eventsCollection.insertOne(newJob);
      res.send(result);
    });

    // UPDATE event by ID
    app.put("/events/:id", verifyFirebaseToken, async (req, res) => {
      const id = req.params.id;
      const updatedEvent = req.body;
      try {
        const result = await eventsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedEvent }
        );

        res.send(result);
      } catch (err) {
        console.error("Failed to update event:", err);
        res.status(500).json({ error: "Failed to update event" });
      }
    });

    // 🔹 DELETE event by ID
    app.delete("/events/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const result = await eventsCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      } catch (err) {
        res.status(500).json({ error: "Failed to delete event." });
      }
    });

    // POST /bookings - Book an event - protected route
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      // Validate required fields
      if (!booking || !booking.event_id || !booking.user_email) {
        return res.status(400).send({ message: "Invalid booking data." });
      }

      // set event date in booking
      booking.event_date = await eventsCollection
        .findOne({
          _id: new ObjectId(booking.event_id),
        })
        .then((event) => event?.eventDate || null);

      // Optional: prevent duplicate booking for same user and event
      const exists = await bookingsCollection.findOne({
        user_email: booking.user_email,
        event_id: booking.event_id,
      });

      if (exists) {
        return res.status(409).send({ message: "Already booked this event." });
      }

      try {
        const result = await bookingsCollection.insertOne(booking);
        res.send(result);
      } catch (err) {
        console.error("Error inserting booking:", err);
        res.status(500).send({ message: "Booking failed", error: err.message });
      }
    });

    // GET /bookings - Get bookings for a user
    app.get("/bookings", verifyFirebaseToken, verifyToken, async (req, res) => {
      const userEmail = req.query.email;

      if (!userEmail)
        return res.status(400).send({ message: "Email query is required." });

      try {
        const bookings = await bookingsCollection
          .find({ user_email: userEmail })
          .toArray();
        res.send(bookings);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to fetch bookings", error: error.message });
      }
    });

    // DELETE /bookings/:id - Cancel a booking
    app.delete("/bookings/:id", async (req, res) => {
      const bookingId = req.params.id;

      if (!ObjectId.isValid(bookingId)) {
        return res.status(400).send({ message: "Invalid booking ID." });
      }

      try {
        const result = await bookingsCollection.deleteOne({
          _id: new ObjectId(bookingId),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Booking not found." });
        }

        res.send({ message: "Booking cancelled successfully." });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to cancel booking", error: error.message });
      }
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
