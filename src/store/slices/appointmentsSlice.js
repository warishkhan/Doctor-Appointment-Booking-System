import { createSlice, nanoid } from '@reduxjs/toolkit';

const savedAppointments = typeof window !== 'undefined'
  ? JSON.parse(localStorage.getItem('appointments')) || []
  : [];

const initialState = {
  appointments: savedAppointments, // { id, name, category, doctor, startTime, endTime, date }
  categories: ['General', 'Dental', 'Cardiology', 'Neurology', 'Pediatrics'], // Available categories
  doctors: ['Dr-Smith', 'Dr-Jane', 'Dr-Doe', 'Dr-Patel', 'Dr-Lee'], // Available doctors
  selectedDate: null,
  isModalOpen: false,
  status: 'idle',
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: {
      reducer(state, action) {
        state.appointments.push(action.payload);
        state.status = 'added';
        localStorage.setItem('appointments', JSON.stringify(state.appointments));
      },
      prepare({ name, category, doctor, startTime, endTime, date }) {
        return {
          payload: {
            id: nanoid(),
            name,
            category,
            doctor,
            startTime,
            endTime,
            date,
          },
        };
      },
    },
    editAppointment(state, action) {
      const { id, name, category, doctor, startTime, endTime, date } = action.payload;
      const existing = state.appointments.find((a) => a.id === id);
      if (existing) {
        existing.name = name;
        existing.category = category;
        existing.doctor = doctor;
        existing.startTime = startTime;
        existing.endTime = endTime;
        existing.date = date;
        state.status = 'updated';
        localStorage.setItem('appointments', JSON.stringify(state.appointments));
      }
    },
    deleteAppointment(state, action) {
      state.appointments = state.appointments.filter((a) => a.id !== action.payload);
      state.status = 'deleted';
      localStorage.setItem('appointments', JSON.stringify(state.appointments));
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    resetStatus(state) {
      state.status = 'idle';
    },
  },
});

export const {
  addAppointment,
  editAppointment,
  deleteAppointment,
  setSelectedDate,
  openModal,
  closeModal,
  resetStatus,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
