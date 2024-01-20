const express = require('express');
const { verifyToken } = require('../../verifyToken');
const { addToFavourites, removeFromFavourites, getFavourites } = require('../../Controller/user/favourite.controller');
const favouriteRoutes = express.Router();

favouriteRoutes.get('/getfavourites',verifyToken,getFavourites);
favouriteRoutes.post('/addtofavourite',verifyToken,addToFavourites);
favouriteRoutes.put('/removefromfavourites',verifyToken,removeFromFavourites);

module.exports = favouriteRoutes;