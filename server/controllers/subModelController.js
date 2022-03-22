const router = require('express').Router();
const { isRegistered } = require('../middleware/guards.js');
const { parseError } = require('../util/parsers.js');

router.get('/trip-create', isRegistered(), (req, res) => {
    res.render('trips/trip-create', {
        title: "Create offer",
    });
});

router.post('/trip-create', isRegistered(), async (req, res) => {
    const submodelData = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date.trim(),
        time: req.body.time.trim(),
        imageUrl: req.body.imageUrl.trim(),
        carBrand: req.body.carBrand.trim(),
        seats: Number(req.body.seats.trim()),
        price: Number(req.body.price.trim()),
        description: req.body.description.trim(),
        buddies: req.body.buddies,
        creator: req.user._id,
    };

    try {
        await req.storage.createSubmodel(submodelData, submodelData.creator);
        res.redirect('/shared-trips');
    } catch (err) {
        const context = {
            errors: parseError(err),
            submodelData: {
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                imageUrl: req.body.imageUrl.trim(),
                carBrand: req.body.carBrand.trim(),
                seats: Number(req.body.seats.trim()),
                price: Number(req.body.price.trim()),
                description: req.body.description.trim(),
                buddies: req.body.buddies,
            }
        };

        res.render('trips/trip-create', context)
    }   
});

router.get('/trip-details/:id', async (req, res) => {
    try {
        const trip = await req.storage.getSubmodelById(req.params.id);
        trip.hasUser = Boolean(req.user);
        trip.isCreator = req.user && req.user._id == trip.creator;
        trip.hasJoined = req.user && trip.buddies?.find(u => u._id == req.user._id);
        trip.availableSpots = trip.seats;
        trip.isAvailable = trip.seats > 0;
        trip.buddiesList = trip.buddies?.map(x => x.email).join(', ');
        const driver = await req.storage.getUserById(trip.creator);
        trip.driverEmail = driver.email;

        res.render('trips/trip-details', {
            trip: trip,        
        });
    } catch (err) {
        console.log(err.message);
        res.render('404');
    }
});

router.get('/trip-details/:id/join', isRegistered(), async (req, res) => {
    try {
        const currentHouse = await req.storage.getSubmodelById(req.params.id);
   
        if (currentHouse.creator == req.user._id) {
            throw new Error('You cannot rent your own house.');
        }
        await req.storage.joinSubmodel(req.params.id, req.user._id);
        res.redirect('/trips/trip-details/' + req.params.id);
    } catch(err) {
        console.log(err.message)
        res.redirect('/trips/trip-details/' + req.params.id);
    }
});

router.get('/trip-edit/:id', isRegistered(), async (req, res) => {
    try {
        const currentTrip = await req.storage.getSubmodelById(req.params.id);

        if (currentTrip.creator != req.user._id) {
            throw new Error('You are not authorized to edit this trip.');
        }

        res.render('trips/trip-edit', { currentTrip }); 
    } catch(err) {
        console.log(err.message)
        res.redirect('/trips/trip-details/' + req.params.id);
    }
});

router.post('/trip-edit/:id', isRegistered(), async (req, res) => {
    try {
        const currentTrip = await req.storage.getSubmodelById(req.params.id);

        if (currentTrip.creator != req.user._id) {
            throw new Error('You are not authorized to edit this trip.');
        }
        await req.storage.editSubmodel(req.params.id, req.body);
        res.redirect('/trips/trip-details/' + req.params.id);
    } catch(err) {
        const context = {
            errors: parseError(err),
            trip: {
            _id: req.params.id,
            startPoint: req.body.startPoint,
            endPoint: req.body.endPoint,
            date: req.body.date,
            time: req.body.time,
            imageUrl: req.body.imageUrl,
            carBrand: req.body.carBrand,
            seats: Number(req.body.seats),
            price: Number(req.body.price),
            description: req.body.description,
            buddies: req.body.buddies,
            }
        }
        console.log(context);
        res.render('trips/trip-edit', context);
    }
});

router.get('/trip-delete/:id', isRegistered(), async (req, res) => {
    try {
        const currentHouse = await req.storage.getSubmodelById(req.params.id);

        if (currentHouse.creator != req.user._id) {
            throw new Error('You are not authorized to delete this trip.');
        }
        await req.storage.deleteSubmodel(req.params.id);
        res.redirect('/shared-trips');
    } catch(err) {
        console.log(err.message)
        res.redirect('/trips/trip-details/' + req.params.id);
    }
});

module.exports = router;