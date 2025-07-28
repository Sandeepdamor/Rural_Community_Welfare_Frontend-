📍 Project: Rural Community Welfare Website

🧾 1. Introduction
The Angular frontend is designed as a modern, responsive web interface to enable rural communities to interact digitally with their elected Sarpanch. It provides features like grievance submission, announcement display, and access to welfare information in both Hindi and English.

🎯 2. Objectives
Provide an easy-to-use interface for rural residents and Sarpanch.

Deliver multilingual access to schemes, documents, and announcements.

Enable online grievance submission and response.

Ensure responsive, accessible UI for all screen sizes and users.

🧱 3. Tech Stack
Layer	Technology
Framework	Angular 17+
Styling	SCSS, Bootstrap
State Mgmt	RxJS / Services
Auth	JWT (via backend)
Routing	Angular Router
Multilingual	ngx-translate (or custom i18n)
Forms	Reactive Forms

📁 4. Folder Structure
bash
Copy
Edit
src/app/
├── authentication/         # Login/Register/Token logic
├── home/                   # Landing/Homepage
├── announcement/           # Community announcements
├── grievance/              # Submit & view grievances
├── dashboard/              # Sarpanch dashboard
├── service-category/       # Welfare schemes & categories
├── users/                  # Resident profile and directory
├── shared/                 # Shared services, components, pipes
├── core/                   # Core app services (auth, API)
└── app-routing.module.ts   # Routing config

🧩 5. Major Modules
5.1 Home Module
Displays landing banners, events, mission/vision.

Shows latest announcements, downloadable forms.

5.2 Grievance Module
Residents can submit complaints using a form.

Sarpanch can view, update status, and respond.

Tracks complaint status (Submitted, In-Progress, Resolved).

5.3 Announcement Module
Public announcements listed in card view.

Add/Edit/Delete available for Sarpanch users.

5.4 Sarpanch Dashboard
Admin login to manage content.

View grievance analytics, user statistics, and site visits.

5.5 Service Category Module
Shows government schemes and skill development programs.

Includes links to forms and registration.

5.6 Multilingual Support
Toggle between Hindi and English.

All text labels and messages translated.

🔐 6. Authentication (JWT-Based)
Login via backend using /api/auth/login.

JWT token stored in localStorage or sessionStorage.

Interceptor attaches token to all protected API requests.

Roles: ROLE_USER, ROLE_SARPANCH

🌐 7. Environment Config
Configure environment file:

ts
Copy
Edit
// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api'
};
📲 8. UI/UX Requirements
Mobile-responsive design using Bootstrap Grid/Flex.

Clean, minimal layout with clear CTA buttons.

Local imagery and cultural design elements.

Keyboard navigable, screen-reader friendly.

Uses consistent color schemes and icon sets.

🧪 9. Testing Strategy
Unit Testing: Component logic with Jasmine/Karma.

Integration Testing: Service-to-Component flow.

UAT: With Sarpanch and residents.

Cross-device Testing: Desktop, tablet, mobile.

Cross-browser Testing: Chrome, Firefox, Edge.

🚀 10. Deployment Instructions
Build:
bash
Copy
Edit
ng build --configuration production
Output:
Files generated in dist/ folder.

Deploy to:
GitHub Pages, Firebase, Vercel, or custom server.

🛠️ 11. Maintenance Notes
Use version control (Git) with proper commit messages.

Ensure multilingual JSON files are updated when adding text.

All services and routes must follow RESTful patterns.

Error handling must be consistent across modules.

📈 12. Future Enhancements (Frontend)
SMS/WhatsApp integration via Twilio API.

Push notifications (PWA support).

Social media sharing links for announcements.

Interactive map view for projects and issues.

Integration with UPI or payment gateway (Razorpay).

✅ 13. Acceptance Criteria
All modules functional and integrated with backend APIs.

UI is responsive and multilingual.

All listed grievances can be tracked and updated.

Admin dashboard functional.

Passes UAT with community representatives.

📬 14. Contributors & Support
Role	Name
UI Developer	Sandeep Damor, Sanjna Chouhan
Backend Dev  Sanjna Chouhan ,Sandeep Damor
Tester	Sanjna Chouhan
Guide/Mentor	-



