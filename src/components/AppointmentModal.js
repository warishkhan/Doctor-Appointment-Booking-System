
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, addAppointment, editAppointment, deleteAppointment } from '../store/slices/appointmentsSlice';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { addNotification } from '../store/slices/notificationsSlice';

const AppointmentModal = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [doctor, setDoctor] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editingId, setEditingId] = useState(null);

  const modalRef = useRef(null);
  const formattedDate = format(new Date(selectedDate), 'yyyy-MM-dd');

  const appointmentsForDate = appointments.filter(
    (appt) => format(new Date(appt.date), 'yyyy-MM-dd') === formattedDate
  );

  const handleSave = () => {
    if (!name || !category || !doctor || !startTime || !endTime) return;

    const appointmentData = {
      id: editingId || Date.now(),
      name,
      category,
      doctor,
      startTime,
      endTime,
      date: selectedDate,
    };

    if (editingId) {
      dispatch(editAppointment(appointmentData));
      toast.success('Appointment updated successfully!');
    } else {
      dispatch(addAppointment(appointmentData));
      toast.success('Appointment booked successfully!');

       // Send a notification for new appointment
       const notification = {
        id: Date.now(),
        message: `New appointment booked with Dr. ${doctor} for ${name}`,
        time: new Date().toLocaleTimeString(),
      };
      dispatch(addNotification(notification));
    }

    clearForm();
    dispatch(closeModal());
  };

  const handleEdit = (appt) => {
    setEditingId(appt.id);
    setName(appt.name);
    setCategory(appt.category);
    setDoctor(appt.doctor);
    setStartTime(appt.startTime);
    setEndTime(appt.endTime);
  };

  const handleDelete = (id) => {
    dispatch(deleteAppointment(id));
    toast.success('Appointment deleted!');
  };

  const clearForm = () => {
    setName('');
    setCategory('');
    setDoctor('');
    setStartTime('');
    setEndTime('');
    setEditingId(null);
  };

  const handleClose = () => {
    clearForm();
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(closeModal());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  const categories = ['General', 'Dental', 'Cardiology', 'Neurology', 'Pediatrics'];
  const doctors = ['Dr-Smith', 'Dr-Jane', 'Dr-Patel', 'Dr-Lee', 'Dr-Brown'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl p-6 w-[90%] max-w-xl shadow-md relative"
      >
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? 'Edit' : 'Book'} Appointment - {format(new Date(selectedDate), 'PPPP')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>

          <input
            type="time"
            className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {editingId ? 'Update' : 'Book'} Appointment
          </button>
          <button onClick={handleClose} className="text-sm text-gray-600 underline dark:text-gray-300">
            Cancel
          </button>
        </div>

        {appointmentsForDate.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Appointments</h3>
            <ul className="space-y-3 max-h-60 overflow-auto">
              {appointmentsForDate.map((appt) => (
                <li
                  key={appt.id}
                  className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm flex justify-between items-start"
                >
                  <div className="text-sm">
                    <p><strong>Name:</strong> {appt.name}</p>
                    <p><strong>Category:</strong> {appt.category}</p>
                    <p><strong>Doctor:</strong> {appt.doctor}</p>
                    <p><strong>Start Time:</strong> {appt.startTime}</p>
                  </div>
                  <div className="flex flex-col gap-1 ml-4">
                    <button
                      onClick={() => handleEdit(appt)}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(appt.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
