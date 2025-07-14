# {{settingsStore.websitename}} - Veterinary Management System

A comprehensive veterinary management system website built with Vue.js 3, featuring modern design, smooth animations, and responsive layout with proper routing.

## 🚀 Features

- **Complete Website Structure**: Home, About, Services, Appointments, Contact, and Pet Care Tips
- **Vue Router**: Proper routing with navigation and page transitions
- **Pinia State Management**: Centralized state management for appointments, UI, and admin settings
- **Dynamic Admin Settings**: Admin can update website name, contact info, and more from the admin panel, reflected everywhere instantly
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Custom CSS animations throughout the site
- **Interactive Forms**: Appointment booking and contact forms with validation
- **Modern UI**: Clean, professional veterinary-themed design
- **Component-Based Architecture**: Well-organized Vue.js components
- **SEO Friendly**: Proper meta tags and page titles

## 🛠️ Technologies Used

- **Vue.js 3**: Progressive JavaScript framework with Composition API
- **Vue Router 4**: Official router for Vue.js
- **Pinia**: State management library for Vue
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Vue Next**: Beautiful icon library
- **PostCSS**: CSS post-processor

## 📁 Project Structure

```
src/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── layout/
│   │   ├── AppFooter.vue
│   │   ├── AppNavigation.vue
│   │   ├── SidebarNavigation.vue
│   │   └── ...
│   ├── sections/
│   │   └── ContactSection.vue
│   └── ui/
│       └── SuccessModal.vue
├── controllers/
│   └── ...
├── data/
│   ├── navigation.js
│   ├── stats.js
│   ├── team.js
│   ├── services.js
│   └── petCareTips.js
├── middleware/
│   └── ...
├── models/
│   └── ...
├── router/
│   └── index.js
├── routes/
│   └── ...
├── services/
│   └── ...
├── stores/
│   ├── settings.js   # <--- Dynamic settings store
│   ├── ui.js
│   └── appointment.js
├── views/
│   ├── AdminSettingsView.vue  # <--- Admin settings page
│   ├── ContactView.vue
│   └── ...
├── App.vue
└── main.js
```

## 🆕 Dynamic Admin Settings System

{{settingsStore.websitename}} now features a dynamic admin settings system, allowing the admin to update website name, contact info, and other details from the Admin Settings page. These changes are reflected everywhere on the site in real time.

### Key Features

- **Admin Settings Page** (`AdminSettingsView.vue`): Update website name, email, phone, address, district, about, photo, and social links.
- **Pinia Store** (`src/stores/settings.js`): Centralized, reactive state for all settings.
- **Dynamic Data Everywhere**: All relevant components (header, footer, contact sections, etc.) use the settings store for up-to-date info.
- **Global Reactivity**: Uses a `settings-updated` event to ensure all components update instantly.
- **Easy Customization**: Default values are placeholders and can be changed from the admin panel.

### Main Files Involved

- `src/stores/settings.js` – Pinia store for settings.
- `src/views/AdminSettingsView.vue` – Admin settings form.
- `src/components/layout/AppFooter.vue` – Dynamic footer.
- `src/components/layout/AppNavigation.vue` – Dynamic navigation bar.
- `src/components/layout/SidebarNavigation.vue` – Dynamic sidebar.
- `src/views/ContactView.vue` and `src/components/sections/ContactSection.vue` – Dynamic contact info.
- `src/App.vue` – Main app shell.
- `src/data/navigation.js` – Navigation items.
- `README.md` – This documentation.

### Example Usage

- Change the website name or contact info in the Admin Settings page.
- All instances of the website name and contact info update instantly across the site.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd veterinary-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎯 Key Features

### Routing
- **Vue Router 4** with proper navigation
- **Page transitions** and scroll behavior
- **Dynamic page titles** based on routes
- **404 handling** with redirect to home

### State Management
- **Pinia stores** for UI state, appointments, and admin settings
- **Reactive data** management
- **Persistent state** for form data

### Components
- **Layout components**: Navigation, Footer, Sidebar
- **View components**: Individual pages
- **UI components**: Reusable modal and form elements
- **Proper component communication** with props and emits

### Forms & Validation
- **Client-side validation** with required fields
- **Loading states** during form submission
- **Success notifications** with modal feedback
- **Form reset** after successful submission

### Animations
- **Custom CSS animations** for page elements
- **Hover effects** and transitions
- **Loading spinners** for better UX
- **Smooth page transitions**

## 🎨 Customization

### Data Configuration
All content can be easily customized through the data files:

- `src/data/navigation.js` - Navigation menu items
- `src/data/stats.js` - Homepage statistics
- `src/data/team.js` - Team member information
- `src/data/services.js` - Veterinary services offered
- `src/data/petCareTips.js` - Pet care educational content

### Styling
- **Tailwind CSS** for utility-first styling
- **Custom animations** in `src/assets/css/main.css`
- **Responsive design** with mobile-first approach
- **Color scheme** easily customizable through Tailwind config

### Adding New Pages
1. Create a new view component in `src/views/`
2. Add the route to `src/router/index.js`
3. Update navigation in `src/data/navigation.js`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1024px and above)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure

- **Views**: Page-level components in `src/views/`
- **Components**: Reusable components in `src/components/`
- **Stores**: Pinia state management in `src/stores/`
- **Router**: Vue Router configuration in `src/router/`
- **Data**: Static data and configuration in `src/data/`

## 🚀 Deployment

The project can be deployed to any static hosting service:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

### Recommended Hosting Services
- **Vercel** (recommended for Vue.js)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions, please contact:
- Email: info@vetcarepro.com
- Phone: (555) 123-4567

---

Built with ❤️ using Vue.js 3 and modern web technologies.
