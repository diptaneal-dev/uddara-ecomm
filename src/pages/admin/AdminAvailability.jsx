import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Card, Row, Col, Spinner, Table, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUserContext } from "../../hooks/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import interactionService from "../../services/InteractionService";

const AdminAvailability = () => {
    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            date: new Date(),
            startTime: "",
            endTime: "",
            recurrence: "ONE_TIME",
            endDate: null,
        },
    });
    const selectedRecurrence = watch("recurrence");
    const [loading, setLoading] = useState(false);
    const [availability, setAvailability] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const userContext = useUserContext() || {};
    const user = userContext?.user || null;
    const currentStoreId = user?.currentStoreId;

    useEffect(() => {
        if (currentStoreId) {
            fetchAvailability();
        }
    }, [currentStoreId]);

    const fetchAvailability = async () => {
        const data = await interactionService.fetchAvailability(currentStoreId);
        setAvailability(data);
    };

    const fetchSlotsForSelectedDate = async () => {
        const data = await interactionService.fetchAvailabilityByDate(currentStoreId, selectedDate.toISOString().split('T')[0]);
        setAvailability(data);
    };

    const generateTimeSlots = (startTime, endTime) => {
        let slots = [];
        let currentTime = new Date(`1970-01-01T${startTime}`);
        let end = new Date(`1970-01-01T${endTime}`);
        while (currentTime < end) {
            let nextTime = new Date(currentTime);
            nextTime.setMinutes(currentTime.getMinutes() + 30);
            slots.push({
                startTime: currentTime.toTimeString().slice(0, 5),
                endTime: nextTime.toTimeString().slice(0, 5)
            });
            currentTime = nextTime;
        }
        return slots;
    };

    const openModal = (slot) => {
        setSelectedSlot(slot);
        setShowModal(true);
    };

    const handleAppointmentSubmit = async (data) => {
        setLoading(true);
        console.log("Appointment Details:", data);
        setLoading(false);
        setShowModal(false);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const payload = {
                store: { id: currentStoreId },
                user: { id: user?.userId },
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
                recurrence: data.recurrence,
                endDate: data.recurrence !== "ONE_TIME" ? data.endDate : null,
            };

            const response = await interactionService.setupAvailability(payload);

            if (response) {
                toast.success("Availability successfully set!", { autoClose: 3000 });
                reset();
                fetchAvailability();
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Error saving availability", error);
            toast.error(error.message || "Failed to save availability. Please try again.", { autoClose: 3000 });
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Setup Availability</h2>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Date</Form.Label>
                                            <Controller
                                                name="date"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker className="form-control" selected={field.value} onChange={(date) => setValue("date", date)} />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Recurrence</Form.Label>
                                            <Controller
                                                name="recurrence"
                                                control={control}
                                                render={({ field }) => (
                                                    <Form.Select {...field}>
                                                        <option value="ONE_TIME">One-Time</option>
                                                        <option value="DAILY">Daily</option>
                                                        <option value="WEEKLY">Weekly</option>
                                                        <option value="MONTHLY">Monthly</option>
                                                    </Form.Select>
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Start Time</Form.Label>
                                            <Controller
                                                name="startTime"
                                                control={control}
                                                render={({ field }) => (
                                                    <input type="time" className="form-control" {...field} />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>End Time</Form.Label>
                                            <Controller
                                                name="endTime"
                                                control={control}
                                                render={({ field }) => (
                                                    <input type="time" className="form-control" {...field} />
                                                )}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {selectedRecurrence !== "ONE_TIME" && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>End Date (If Recurring)</Form.Label>
                                        <Controller
                                            name="endDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker className="form-control" selected={field.value} onChange={(date) => setValue("endDate", date)} />
                                            )}
                                        />
                                    </Form.Group>
                                )}
                                <Button type="submit" className="w-100" disabled={loading}>
                                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Save Availability"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h3 className="text-center">Available Slots</h3>
                            <DatePicker className="form-control mb-3" selected={selectedDate} onChange={setSelectedDate} />
                            <Button className="w-100 mb-3" onClick={fetchAvailability}>Fetch Slots</Button>
                            <div className="d-flex flex-wrap gap-2">
                                {availability
                                    .filter(slot => slot.date === selectedDate.toISOString().split('T')[0])
                                    .flatMap(slot => generateTimeSlots(slot.startTime, slot.endTime))
                                    .map((timeSlot, index) => (
                                        <Button key={index} variant="outline-primary" className="m-1" onClick={() => openModal(timeSlot)}>
                                            {timeSlot.startTime} - {timeSlot.endTime}
                                        </Button>
                                    ))}
                                {availability.filter(slot => slot.date === selectedDate.toISOString().split('T')[0]).length === 0 && (
                                    <p className="text-center w-100">No available slots</p>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>


            </Row>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Schedule Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleAppointmentSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control type="email" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number *</Form.Label>
                            <Form.Control type="tel" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Brief Description of Consultation *</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Please provide a short description of your consultation request." required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Invite Guests (comma-separated emails)</Form.Label>
                            <Form.Control type="text" placeholder="example1@email.com, example2@email.com" pattern="^(\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*,?\s*)*$" />
                        </Form.Group>
                        <Button type="submit" className="w-100" disabled={loading}>
                            {loading ? "Scheduling..." : "Schedule Appointment"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default AdminAvailability;
