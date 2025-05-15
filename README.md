# Rental Car - Frontend Application

This project is a frontend application for "RentalCar", a car rental company. It allows users to browse a catalog of available vehicles, view detailed information about each car, filter them by various criteria, add cars to a list of favorites, and simulate a booking process.

## Features

* **Homepage:** Displays a welcoming banner with a call to action.
* **Catalog Page:**
    * Displays a list of available rental cars.
    * Pagination with a "Load More" button.
    * Filtering by car brand, price per hour, and mileage range.
    * Ability to add/remove cars from a "Favorites" list.
    * Favorites are persisted in local storage.
* **Car Details (Modal):**
    * Opens a modal window with detailed information about a selected car when clicking "Read more" on a car card.
    * Displays car specifications, accessories, functionalities, and rental conditions.
    * Includes a form to "Book your car now" with validation.

## Tech Stack

* **Framework/Library:** React (with Vite as a build tool)
* **State Management:** Redux Toolkit
* **Routing:** React Router DOM
* **API Requests:** Axios
* **UI Library:** Material-UI (MUI)
* **Form Handling:** Formik
* **Schema Validation:** Yup
* **Language:** TypeScript

## Project Structure

The project follows a feature-oriented structure:

-   `public/`: Static assets.
-   `src/`: Source code.
    -   `api/`: Axios instance configuration.
    -   `assets/`: Local assets like images.
    -   `components/`: Reusable UI components, including:
        -   `App/`: Root application component.
        -   `MainNav/`: Main navigation.
        -   `PageHeader/`: Site header.
        -   `VehicleCard/`: Card for displaying a single car in the catalog.
        -   `VehicleFilters/`: Car filtering interface.
        -   `VehicleList/`: List of car cards.
        -   `VehicleDetailsModalContent/`: Content for the car details modal.
        -   `ui/`: Generic UI elements (e.g., `MainLayout`, `NavLink`).
    -   `hooks/`: Custom React hooks (e.g., typed Redux hooks).
    -   `pages/`: Page-level components (`HomePage`, `VehicleCatalogPage`).
    -   `redux/`: Redux store configuration.
        -   `catalog/`: Slice, thunks, selectors, and types for the car catalog.
        -   `store.ts`: Store configuration with `redux-persist`.
    -   `theme/`: Material-UI theme configuration (`theme.ts`, `types.ts` for MUI augmentation).
    -   `main.tsx`: Application entry point.
    -   `index.css`: Global styles.

## API

The application interacts with a backend API provided at:
`https://car-rental-api.goit.global/api-docs/`
Endpoints used:
* `GET /cars`: To fetch a list of cars with pagination and filtering.
* `GET /cars/{id}`: To fetch details for a specific car.
* (Future implementation) `GET /brands`: To fetch available car brands for filters.

## Setup and Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd my-rental-car-app 
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  Set up environment variables (if any):
    * Create a `.env` file in the root directory if needed for API keys or other configurations.

4.  Run the development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Available Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the application for production.
* `npm run lint`: Lints the codebase using ESLint.
* `npm run preview`: Serves the production build locally for preview.

## Author

* [Your Name / Username]
* [Link to your GitHub profile or other relevant link (optional)]

---