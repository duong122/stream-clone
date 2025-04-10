const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import các model
const Studio = require('./models/studioModel'); 
const Movie = require('./models/movieModel');
const Actor = require('./models/actorModel');
const Director = require('./models/directorModel');
const Comment = require('./models/commentModel');
const VIPPayment = require('./models/vipPaymentModel');
const Category = require('./models/categoryModel');
const Revenue = require('./models/revenueModel');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname')
    .then(() => {
        console.log('Connected to MongoDB');
        importMockData();  // Gọi hàm để import dữ liệu
    })
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Hàm đọc và import dữ liệu từ các file JSON vào MongoDB
const importMockData = async () => {
    try {
        // Đọc các file JSON từ thư mục mockdata
        const studioData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'studios.json')));
        const movieData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'movies.json')));
        const actorData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'actors.json')));
        const directorData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'directors.json')));
        const commentData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'comments.json')));
        const vipPaymentData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'vipPayments.json')));
        const categoryData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'categories.json')));
        const revenueData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'revenues.json')));

        // Chèn dữ liệu vào MongoDB
        await Studio.insertMany(studioData);
        console.log('Studio data imported');

        await Movie.insertMany(movieData);
        console.log('Movie data imported');

        await Actor.insertMany(actorData);
        console.log('Actor data imported');

        await Director.insertMany(directorData);
        console.log('Director data imported');

        await Comment.insertMany(commentData);
        console.log('Comment data imported');

        await VIPPayment.insertMany(vipPaymentData);
        console.log('VIPPayment data imported');

        await Category.insertMany(categoryData);
        console.log('Category data imported');

        await Revenue.insertMany(revenueData);
        console.log('Revenue data imported');

        mongoose.connection.close();  // Đóng kết nối sau khi nhập dữ liệu
    } catch (error) {
        console.error('Error importing mock data:', error);
        mongoose.connection.close();
    }
};
