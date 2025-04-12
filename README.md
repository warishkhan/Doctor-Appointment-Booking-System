# Appointment Booking System

A web application designed to help users book and manage doctor appointments. It provides a user-friendly interface with features such as a search bar for finding doctors, a calendar to view and book appointments, real-time notifications, and dark mode support. The app is built using Next.js, Redux Toolkit, Tailwind CSS, and Lucide Icons for a seamless user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Components](#components)
- [Redux State Management](#redux-state-management)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Search for Doctors**: A powerful search functionality that allows users to search for doctors by name. As users type, the list of doctors is filtered in real-time.
- **Appointment Calendar**: A dynamic calendar grid displays all scheduled appointments and allows users to interact with the calendar to book, view, or modify appointments.
- **Notifications**: Users receive real-time notifications about their upcoming appointments and any updates to their schedules.
- **Dark Mode**: Users can toggle between light and dark themes for improved accessibility, especially in low-light conditions.
- **Responsive Design**: The app adapts to all screen sizes, ensuring a smooth user experience on desktop, tablet, and mobile devices.

## Tech Stack

This project uses the following technologies:

- **Frontend**:
  - **Next.js**: React framework that provides server-side rendering (SSR) and static site generation (SSG) for optimal performance.
  - **React**: A JavaScript library for building user interfaces, making the app interactive.
  - **Redux Toolkit**: A state management library used to manage global app states like doctors, appointments, etc.
  - **Tailwind CSS**: A utility-first CSS framework for fast and customizable styling, ensuring a clean and responsive design.
  - **Lucide Icons**: A collection of modern, customizable icons used throughout the app.

- **State Management**:
  - **Redux Toolkit**: Simplifies the process of handling and updating global states. The `appointments` slice manages doctor data, appointments, and filtered results.

- **Client-Side Rendering**:
  - **Dynamic Imports in Next.js**: Used to load components such as the calendar grid only on the client side to optimize performance.

## Installation

To get started with this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/warishkhan/Doctor-Appointment-Booking-System.git
    

2. **Navigate to the project directory**:
    cd appointment-booking-system

3. **Install dependencies using npm**:
    npm install

4. **Run the development server**:
    npm run dev

5. Access the app by opening http://localhost:3000 in your browser.

Usage
   Searching for Doctors
   At the top of the page, you’ll find a search bar where you can enter the name of a doctor. The app will filter through the list of available doctors in real-time as you type.

    Once a doctor’s name is found, click on it to view their details and available appointments.

Booking and Viewing Appointments
    The Calendar Grid section displays all the scheduled appointments. Click on a date to see available appointment slots and book your appointment.

    Once booked, the appointment will be shown in the calendar. You can view your upcoming appointments and manage them from the same interface.

Notifications
    The app includes real-time notifications for upcoming appointments and updates. You can click the notification icon to view any new messages.

Dark Mode
    Use the Theme Toggle button in the top-right corner to switch between light and dark mode. This provides a more comfortable viewing experience, especially in dimly lit environments.

Directory Structure

/appointment-booking-system

    ├── /components          # Reusable components (e.g., ThemeToggle, CalendarGrid, NotificationBell)
    │   ├── /CalendarGrid    # Displays the calendar and appointment slots
    │   ├── /ThemeToggle     # Allows users to toggle between dark and light modes
    │   └── /NotificationBell # Displays the notification bell for upcoming appointments
    ├── /pages              # Next.js pages (e.g., Home, Doctor Details)
    │   ├── index.js        # Main page of the app
    │   └── /doctors/[name].js # Dynamic route for doctor details
    ├── /redux              # Redux store and slices for state management
    │   ├── store.js         # Configures Redux store
    │   └── appointmentsSlice.js # Contains appointments and doctors data
    ├── /public             # Static assets (e.g., images, fonts)
    ├── /styles             # Global styles (e.g., Tailwind CSS configuration)
    ├── /utils              # Helper functions (e.g., date formatting)
    └── /node_modules       # Project dependencies (managed by npm)

Components
Home Page
    Displays a search bar for filtering doctors, a list of doctors matching the search query, and a calendar grid to manage appointments.

    Features a theme toggle and a notification bell.

DoctorDetailPage
    Displays the details of a specific doctor, including their appointment schedule and a description of available services.

NotificationBell
    A component that shows real-time notifications about upcoming appointments or any changes.

ThemeToggle
    A button that allows users to toggle between light and dark mode. The app adapts its appearance based on the theme chosen by the user.

CalendarGrid
    A dynamic grid that renders a calendar, allowing users to view and interact with appointment slots.

Redux State Management
    The application utilizes Redux Toolkit to manage global states. The Redux store contains the following:

appointmentsSlice.js
    This slice manages:

      Doctors: A list of available doctors.

      Appointments: A list of all scheduled appointments.

      Filtered Results: The filtered doctors based on the search query.

      Reducers in this slice handle filtering the doctor list, updating appointments, and managing UI states.

store.js
    The Redux store is set up here, combining the reducers and applying middleware (such as Redux DevTools for debugging).

Contributing
   Contributions are welcome! If you'd like to improve the application or add new features, feel free to fork the repository and submit a pull request.

Steps to Contribute:
1. Fork the repository.

2. Create a new branch (git checkout -b feature-name).

3. Make your changes and commit them (git commit -am 'Add new feature').

4. Push to your branch (git push origin feature-name).

5. Open a pull request.


License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
    Next.js: A React framework for building server-rendered or statically generated applications.

    Redux Toolkit: A library that simplifies state management in React applications.

    Tailwind CSS: A utility-first CSS framework for creating responsive designs.

    Lucide React: A modern, customizable icon library used throughout the app.

    React: A JavaScript library for building interactive user interfaces.


  
This `README.md` file provides a comprehensive overview of the project, its structure, and its features. You can copy and paste this into your `README.md` file in the root directory of your project.


