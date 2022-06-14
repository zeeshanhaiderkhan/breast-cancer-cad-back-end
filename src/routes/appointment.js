const router = require('express').Router();
const {add_new_appointment,get_apppointments_by_date,delete_appointment_by_id,
    delete_appointments_by_date,get_appointment_by_id,get_appointments_by_pid,
    get_appointments_by_did,
    book_appointment,
    cancel_appointment,
    get_appointments_booked_by_did,
    get_all_appointments
    } =require('../controllers/appointment');

require('dotenv').config();

router.post('/new',add_new_appointment); //add new appointmens from list of many
router.get('/getByDate/:date/:did',get_apppointments_by_date); //get apppointments by date filter
router.delete('/deleteById/:aid',delete_appointment_by_id);
router.delete('/deleteByDate',delete_appointments_by_date);
router.get('/getById/:aid',get_appointment_by_id);
router.get('/getByPid/:pid',get_appointments_by_pid);
router.get('/getByDid/:did',get_appointments_by_did);
router.put('/book/:aid',book_appointment);
router.put('/cancel/:aid',cancel_appointment);
//for getting booked appointments by patients from did
router.get('/getBookedByDid/:did',get_appointments_booked_by_did)
router.get('/all',get_all_appointments);

module.exports = router;
