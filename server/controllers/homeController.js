const router = require('express').Router();

router.get('/', async (req, res) => {
    let trips = await req.storage.getAll();
        res.render('home', {
        title: "Home page",
        trips
    });
});

router.get('/shared-trips', async (req, res) => {
    const trips = await req.storage.getAll();
    res.render('shared-trips', {
        title: "Shared Trips",
        trips
    });
});

router.get('/user/:id', async (req, res) => {
    const userEmail = req.user.email;
    const currentUser = await req.storage.getUserByEmail(userEmail);
    const gender = currentUser.gender;
    const image = `../static/images/${gender}.png`;
    currentUser.image = image;
    currentUser.trips = currentUser.tripsHistory;
    const buddies = currentUser.buddies;

    res.render('user/profile', {
        title: "Profile",
        currentUser,
        buddies
    })
});

module.exports = router;