# Cane Payroll PWA

A robust, offline-first Progressive Web App for capturing and managing sugar cane payroll data. Built with static HTML/JS, hosted on GitHub Pages, and powered by Supabase as a backend.

---

## Features
- **Offline-first:** Works fully offline, queues submissions in localStorage, syncs to Supabase when online.
- **Two main views:**
  - **Admin Office:** Manage employees, trucks, mill weights, deductions, reports, and config.
  - **Data Capture:** Simple, robust, truck-centric field data entry for multiple cutters per truck.
- **PWA:** Installable, with service worker for caching and offline support.
- **Supabase backend:** Secure, RLS-enabled tables for all data.

---

## Project Structure
- `index.html` – Main app UI
- `supabase.js` – Supabase client setup
- `service-worker.js` – PWA offline logic

---

## Setup & Local Development
1. **Clone the repo:**
   ```sh
   git clone https://github.com/yourusername/Cane-Payroll.git
   cd Cane-Payroll
   ```
2. **Run locally:**
   ```sh
   python3 -m http.server 8000
   # Then open http://localhost:8000 in your browser
   ```
3. **Supabase:**
   - Project URL and anon key are in `supabase.js` (public, safe for frontend use)
   - Backend tables and RLS must be set up in your Supabase project (see below)

---

## Supabase Backend Schema
- **Tables:**
  - `canecutters` – Cutter info
  - `dailycuts` – Daily field data (legacy)
  - `deductions` – Deductions per cutter
  - `truck_loads` – Each truck's load, date, mill weight, etc.
  - `truck_cutters` – Cutters per truck, field weights, etc.
  - `wage_scale` – Wage brackets by tons (configurable)
  - `uif_rate` – UIF percentage (configurable)
  - `config` – (legacy, not used)
- **RLS:** Enabled on all tables, open policies for anon key
- **Relationships:** Each truck_load has many truck_cutters; mill weight is entered/administered later and proportionally adjusts each cutter's weight

---

## PWA & Offline Notes
- **Service worker** caches all assets and API requests
- **Data entry** works offline, queues in localStorage, syncs when online
- **Cutter list** is cached for fast field entry
- **Troubleshooting:**
  - If updates don't appear, clear browser cache and unregister service worker
  - GitHub Pages may take a few minutes to update after push

---

## Deployment
- **Hosted on GitHub Pages** (main branch, root folder)
- **No build step** – just static files
- **To deploy:** Commit and push to main branch

---

## Contribution & Help
- **How to get help:**
  - Ask about UI, offline logic, Supabase schema, or new features
  - Example: "Add a new report to admin view", "Debug offline sync", "Refactor data capture form"
- **Known issues/TODOs:**
  - See code comments and open issues for bugs or planned features

---

## Security
- Only the Supabase anon key is used in frontend (safe)
- Never commit service keys or private credentials

---

## Contact
For questions or help, open an issue or contact the maintainer. 