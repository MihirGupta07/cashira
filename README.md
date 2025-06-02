# Cashira - Money Tracking PWA

Cashira is a Progressive Web App (PWA) for tracking personal finances built with Next.js, Tailwind CSS, and Firebase.

## Features

- **Google Authentication**: Secure sign in with Google
- **Transaction Management**: Add, edit, and delete income and expense transactions
- **Dashboard**: Visualize your financial data with charts
- **Responsive Design**: Works on mobile and desktop
- **Offline Support**: Works offline with data sync when back online
- **Dark Mode**: System-based and manual dark mode toggle
- **PWA Support**: Installable on mobile and desktop devices

## Tech Stack

- **Frontend**: Next.js 14 App Router + Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Charts**: Chart.js with react-chartjs-2
- **PWA**: next-pwa
- **Theme**: next-themes for dark mode
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cashira.git
cd cashira
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Firebase credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication with Google provider
3. Create a Firestore database
4. Deploy the security rules from `firebase.rules`

## Deployment

The app is ready to be deployed on Vercel or Netlify:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cashira)

## License

This project is licensed under the MIT License.
