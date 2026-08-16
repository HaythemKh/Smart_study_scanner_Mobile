# Smart Study Scanner - Mobile App

> React Native mobile application for AI-powered document scanning and study material generation

## 📖 Overview

Smart Study Scanner Mobile is a cross-platform mobile application built with React Native and Expo. It enables students to upload documents (PDF, DOCX, PPTX), generate AI-powered summaries, quizzes, and flashcards, and track their learning progress with gamification features.

## ✨ Key Features

- 📄 **Document Upload** - Scan and upload PDF, DOCX, PPTX files from your device
- 🤖 **AI-Powered Generation** - Auto-generate summaries, quizzes, and flashcards
- 📚 **Personal Library** - Organize all your study materials in one place
- 🎯 **Interactive Quizzes** - Take quizzes with instant feedback and explanations
- 🎴 **Flashcards** - Review with swipeable flashcard sets
- 🎮 **Gamification** - Earn XP, level up, and maintain daily streaks
- 🔐 **Google Sign-In** - Secure authentication with Google OAuth
- 🌙 **Beautiful UI** - Modern design with smooth animations and transitions
- 📱 **Cross-Platform** - Works on iOS and Android

## 🛠️ Tech Stack

- **React Native 0.83** - Mobile framework
- **Expo 55** - Development platform
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based navigation
- **NativeWind** - Tailwind CSS for React Native
- **Zustand** - State management
- **Axios** - HTTP client
- **React Native Reanimated** - Animations
- **Skia** - Advanced graphics

## 📋 Prerequisites

Make sure you have installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Expo Go** app on your mobile device (for testing)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, Mac only)
- **Backend API** running (see [smart-study-scanner-api](https://github.com/HaythemKh/smart-study-scanner-api))

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/HaythemKh/smart-study-scanner-mobile.git
cd smart-study-scanner-mobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Google OAuth Web Client ID
# Get from: https://console.cloud.google.com/apis/credentials
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID="your-google-web-client-id.apps.googleusercontent.com"

# Backend API URL
# Development: Use your computer's IP address
EXPO_PUBLIC_API_URL="http://YOUR_IP:3000/api"

# Example for local network:
# EXPO_PUBLIC_API_URL="http://192.168.1.100:3000/api"

# Example for localhost (Android emulator):
# EXPO_PUBLIC_API_URL="http://10.0.2.2:3000/api"
```

**Important Notes:**

- Replace `YOUR_IP` with your computer's IP address on the local network
- For Android emulator, use `10.0.2.2` instead of `localhost`
- For iOS simulator, you can use `localhost`
- Make sure the backend API is running and accessible

### 4. Configure Google Sign-In

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 credentials
3. Add your app's package name and SHA-1 certificate
4. Copy the Web Client ID to `.env.local`

### 5. Start the Development Server

```bash
npm start
```

This will start the Expo development server and show a QR code.

### 6. Run on Device/Emulator

**⚠️ Important Note About Google Sign-In:**
Google OAuth authentication **does not work with Expo Go**. You can test other features with Expo Go, but the login functionality will not work. To test the complete app including authentication, you must use one of the following options:

**Option 1: Development Build on Emulator (Recommended for Development)**

```bash
# For Android
npm run android

# For iOS (Mac only)
npm run ios
```

**Option 2: Build Standalone App with EAS Build (For Physical Devices)**

```bash
# Install EAS CLI (if not already installed)
npm install -g eas-cli

# Login to Expo account
eas login

# Build for Android
eas build --platform android --profile development

# Build for iOS
eas build --platform ios --profile development
```

**Option 3: Expo Go (Limited - No Authentication)**

- Install Expo Go from App Store (iOS) or Play Store (Android)
- Scan the QR code from the terminal
- **Note:** Google Sign-In will not work, but you can test UI and other features

## 📚 Available Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm start`       | Start Expo development server   |
| `npm run android` | Run on Android device/emulator  |
| `npm run ios`     | Run on iOS simulator (Mac only) |
| `npm run web`     | Run on web browser              |
| `npm run lint`    | Lint code with ESLint           |

## 📱 App Structure

```
smart-study-scanner-mobile/
├── app/
│   ├── (auth)/            # Authentication screens
│   │   └── sign-in.tsx    # Google sign-in screen
│   ├── (tabs)/            # Main tab navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── library.tsx    # Library screen
│   │   └── profile.tsx    # Profile screen
│   ├── flashcards/        # Flashcard screens
│   ├── quiz/              # Quiz screens
│   ├── summary/           # Summary screens
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # App entry point
├── components/
│   ├── auth/              # Authentication components
│   ├── navigation/        # Navigation components
│   └── ui/                # Reusable UI components
├── contexts/
│   └── AuthContext.tsx    # Authentication context
├── hooks/
│   └── useLibraryContent.ts # Library content hook
├── services/
│   ├── api.ts             # API client
│   ├── aiApi.ts           # AI generation API
│   ├── libraryApi.ts      # Library API
│   └── quizApi.ts         # Quiz API
├── store/
│   └── useAppStore.ts     # Global state management
├── utils/
│   ├── googleAuth.ts      # Google OAuth utilities
│   └── secureStorage.ts   # Secure storage utilities
├── .env.local             # Environment variables (not in repo)
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── README.md              # This file
```

## 🎨 Key Features Breakdown

### Authentication

- Google OAuth 2.0 sign-in
- Secure token storage
- Auto-login on app launch
- Logout with session cleanup

### Document Upload

- Pick files from device storage
- Support for PDF, DOCX, PPTX
- Upload progress indicator
- Error handling

### AI Generation

- Generate summaries from documents
- Create interactive quizzes
- Build flashcard sets
- Real-time processing feedback

### Library

- View all generated content
- Search and filter
- Favorite items
- Delete unwanted content

### Quizzes

- Multiple-choice questions
- Instant feedback
- Explanations for answers
- Score tracking
- Retry option

### Flashcards

- Swipeable card interface
- Front/back flip animation
- Progress indicator
- Shuffle option

### Profile & Gamification

- View XP, level, and streak
- Daily streak tracking
- Achievement system
- Study goal progress

## 🔌 API Integration

The mobile app connects to the backend API for:

### Authentication

- `POST /auth/google` - Google OAuth sign-in

### Documents

- `POST /documents/upload` - Upload document
- `GET /documents` - List documents

### AI Generation

- `POST /ai-generation/summary` - Generate summary
- `POST /ai-generation/quiz` - Generate quiz
- `POST /ai-generation/flashcards` - Generate flashcards

### Library

- `GET /library` - Get user's library
- `GET /library/summaries` - Get summaries
- `GET /library/quizzes` - Get quizzes
- `GET /library/flashcards` - Get flashcards

### Quizzes

- `POST /quiz-attempts` - Submit quiz attempt
- `GET /quiz-attempts/:quizId` - Get quiz results

### Gamification

- `GET /gamification/stats/:userId` - Get user stats

## 🚀 Building for Production

### Android

```bash
# Build APK
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

### iOS

```bash
# Build for TestFlight
eas build --platform ios --profile preview

# Build for App Store
eas build --platform ios --profile production
```

## 🐛 Troubleshooting

### Common Issues

**"Network request failed"**

- Check if backend API is running
- Verify `EXPO_PUBLIC_API_URL` in `.env.local`
- Use correct IP address (not localhost for physical devices)

**Google Sign-In not working**

- Verify OAuth credentials in Google Cloud Console
- Check `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- Ensure SHA-1 certificate is added (Android)

**App crashes on launch**

- Clear cache: `expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Rebuild the app

**Upload not working**

- Check file size limits
- Verify file type support
- Check network connection

## 🔗 Related Repositories

- **Backend API**: [smart-study-scanner-api](https://github.com/HaythemKh/smart-study-scanner-api) - NestJS backend
- **Admin Dashboard**: [smart-study-scanner-admin](https://github.com/HaythemKh/smart-study-scanner-admin) - Next.js admin panel

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using React Native and Expo**
