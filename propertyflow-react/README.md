# PropertyFlow React

React SPA migration of the supplied PropertyFlow project.

## Start
1. Open this folder in VS Code.
2. In the terminal run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints.

## Page files and URLs
Each main page is now in its own component file:
- `src/pages/Home.jsx` — `/`
- `src/pages/Listings.jsx` — `/properties`
- `src/pages/ListingForm.jsx` — `/list-property`
- `src/pages/Enquiry.jsx` — `/enquiry`
- `src/pages/Dashboard.jsx` — `/dashboard`
- `src/pages/AuthPage.jsx` — `/login` and `/register`

`src/App.jsx` now contains only the route table and the shared page shell. Click the links in the header to navigate between URLs; React Router handles the navigation. Shared header/route guard/heading are in `src/layout/Shared.jsx`; reusable inputs and listing components are in `src/components.jsx`; validation rules are in `src/validation.js`.

State remains split between Context (session/toast), Redux Toolkit (property listings/wishlist), and local component state (form values/filters). Listing load has async loading/error/retry states. Data persists in localStorage as a browser-only demo; account storage is not secure for production.
- `src/pages/Portfolio.jsx` — `/portfolio`, a routed mini portfolio page linked from the header
