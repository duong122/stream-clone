require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const PORT = 5000;


const movieRoutes = require('./routes/movieRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const studioRoutes = require('./routes/studioRoutes');
const actorRoutes = require('./routes/actorRoutes');
const directorRoutes = require('./routes/directorRoutes');
const revenueRoutes = require('./routes/revenueRoutes');
const commentRoutes = require('./routes/commentRoutes');
const vipPaymentRoutes = require('./routes/vipPaymentRoutes');
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/movieDB");

// Sử dụng các routes
// app.use("/admin/actors", actorRoutes);

app.use('/movies', movieRoutes);
app.use('/categories', categoryRoutes);
app.use('/studios', studioRoutes);
app.use('/actors', actorRoutes);
app.use('/directors', directorRoutes);
app.use('/revenues', revenueRoutes);
app.use('/comments', commentRoutes);
app.use('/vip-payments', vipPaymentRoutes);
app.use("/users", userRoutes);
app.use('/payment', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});


