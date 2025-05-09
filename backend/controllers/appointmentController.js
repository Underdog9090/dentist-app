import Appointment from '../models/Appointment.js';
import { sendReplyEmail, sendAppointmentConfirmation, sendAppointmentCancellation } from '../utils/email.js';

// Create new appointment
export const createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment({
            ...req.body,
            user: req.user.id
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all appointments for the logged-in user
export const getAppointments = async (req, res) => {
    try {
        let appointments;
        if (req.user.role === 'admin') {
            appointments = await Appointment.find().sort({ date: 1 });
        } else {
            appointments = await Appointment.find({ user: req.user.id }).sort({ date: 1 });
        }
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single appointment
export const getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update appointment
export const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check if status is being changed
        const statusChanged = req.body.status && req.body.status !== appointment.status;

        // Update the appointment
        Object.assign(appointment, req.body);
        await appointment.save();

        // Send appropriate email based on status change
        if (statusChanged) {
            try {
                if (req.body.status === 'confirmed') {
                    await sendAppointmentConfirmation(appointment);
                } else if (req.body.status === 'cancelled') {
                    await sendAppointmentCancellation(appointment);
                }
            } catch (emailError) {
                console.error('Failed to send status change email:', emailError);
                // Don't fail the request if email fails
            }
        }

        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a reply to an appointment
export const addReply = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        if (!body || !body.trim()) {
            return res.status(400).json({ message: 'Reply body is required' });
        }
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        const reply = {
            body,
            admin: req.user.username || req.user.email || 'admin',
            date: new Date()
        };
        appointment.replies.push(reply);
        appointment.read = true;
        await appointment.save();

        // Send email notification to patient
        try {
            await sendReplyEmail(appointment, reply.body);
        } catch (emailErr) {
            // Log but don't fail the request if email fails
            console.error('Failed to send reply email:', emailErr);
        }

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 