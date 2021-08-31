const router = require('express').Router();
const controller = require('./controllers');

// Connect controller methods to their corresponding routes
router.get('/users', controller.users.get);

router.post('/users', controller.users.post);

router.get('/events/:eventName', controller.events.get);

router.get('/events', controller.events.getAll);

router.post('/events', controller.events.post);

router.get('/events/:email/', controller.events.getUserEvents);

router.get('/users/:eventName/', controller.events.getAttendees);

module.exports = router;
