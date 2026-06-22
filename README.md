# X Clone

A full-stack mobile clone of X (formerly Twitter), built with React Native (Expo) and a Node.js/Express + MongoDB backend. Users can sign in with Google/Apple, create posts with images, like, comment, follow other users, edit their profile, and receive notifications.

## Features

- 🔐 **Social authentication** — Google & Apple sign-in powered by [Clerk](https://clerk.com/)
- 📝 **Posts** — create posts with text and image uploads
- ❤️ **Engagement** — like, comment on, and delete posts
- 👤 **Profiles** — view profiles, edit your own (bio, location, profile & banner images), follow/unfollow users
- 🔔 **Notifications** — get notified on likes, comments, and follows
- 🖼️ **Image uploads** — handled via [Cloudinary](https://cloudinary.com/)
- 🛡️ **Rate limiting & bot protection** — via [Arcjet](https://arcjet.com/) (optional)

## Tech Stack

### Mobile (`mobile/`)
- [Expo](https://expo.dev/) (React Native 0.79, React 19)
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- [TanStack Query](https://tanstack.com/query) for server state
- [Clerk Expo](https://clerk.com/docs/quickstarts/expo) for auth
- [Axios](https://axios-http.com/) for API requests
- TypeScript

### Backend (`backend/`)
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [Clerk Express](https://clerk.com/docs/references/express/overview) for auth middleware
- [Cloudinary](https://cloudinary.com/) for media storage
- [Multer](https://github.com/expressjs/multer) for upload handling
- [Arcjet](https://arcjet.com/) for security
- Deployable to [Vercel](https://vercel.com/)

## Project Structure

```
X_clone/
├── backend/                # Express API server
│   └── src/
│       ├── config/         # env, db, cloudinary, arcjet config
│       ├── controllers/    # route handlers (user, post, comment, notification)
│       ├── middleware/      # auth, upload, arcjet middleware
│       ├── models/         # Mongoose schemas
│       ├── routes/         # API route definitions
│       └── server.js       # app entry point
└── mobile/                 # Expo React Native app
    ├── app/                # screens (expo-router): (auth), (tabs)
    ├── components/         # reusable UI components
    ├── hooks/              # custom hooks (usePosts, useProfile, etc.)
    ├── utils/              # api client, formatters
    └── types/              # shared TypeScript types
```

## API Endpoints

| Method | Endpoint                       | Auth | Description              |
| ------ | ------------------------------ | ---- | ------------------------ |
| GET    | `/api/users/profile/:username` | No   | Get a user's profile     |
| POST   | `/api/users/sync`              | Yes  | Sync Clerk user to DB    |
| GET    | `/api/users/me`                | Yes  | Get current user         |
| PUT    | `/api/users/profile`           | Yes  | Update profile           |
| POST   | `/api/users/follow/:targetUserId` | Yes | Follow/unfollow a user |
| GET    | `/api/posts`                   | No   | Get all posts            |
| GET    | `/api/posts/:postId`           | No   | Get a single post        |
| GET    | `/api/posts/user/:username`    | No   | Get a user's posts       |
| POST   | `/api/posts`                   | Yes  | Create a post (w/ image) |
| POST   | `/api/posts/:postId/like`      | Yes  | Like/unlike a post       |
| DELETE | `/api/posts/:postId`           | Yes  | Delete a post            |
| GET    | `/api/comments/post/:postId`   | No   | Get comments on a post   |
| POST   | `/api/comments/post/:postId`   | Yes  | Add a comment            |
| DELETE | `/api/comments/:commentId`     | Yes  | Delete a comment         |
| GET    | `/api/notifications`           | Yes  | Get notifications        |
| DELETE | `/api/notifications/:notificationId` | Yes | Delete a notification |

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A [MongoDB](https://www.mongodb.com/) database (e.g. MongoDB Atlas)
- A [Clerk](https://clerk.com/) account
- A [Cloudinary](https://cloudinary.com/) account
- (Optional) An [Arcjet](https://arcjet.com/) account
- [Expo Go](https://expo.dev/go) app on your device, or an emulator/simulator

### 1. Clone the repository
```bash
git clone https://github.com/kidusw/X_clone.git
cd X_clone
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5001
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ARCJET_KEY=your_arcjet_key
```

Run the dev server:
```bash
npm run dev      # starts on the PORT from .env with --watch
# or
npm start
```

### 3. Mobile setup
```bash
cd mobile
npm install
```

Create a `.env` file in `mobile/`:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_API_URL=http://<your-local-ip>:5001/api
```

> **Note:** `localhost` will not work from a physical device. Use your machine's local network IP (e.g. `http://192.168.1.10:5001/api`), or point `EXPO_PUBLIC_API_URL` at your deployed backend.

Start the app:
```bash
npm start        # then scan the QR code with Expo Go
# or
npm run android
npm run ios
```

## Scripts

### Backend
| Command       | Description                          |
| ------------- | ------------------------------------ |
| `npm run dev` | Start server in watch mode           |
| `npm start`   | Start server                         |

### Mobile
| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm start`       | Start the Expo dev server    |
| `npm run android` | Run on Android               |
| `npm run ios`     | Run on iOS                   |
| `npm run web`     | Run in the browser           |
| `npm run lint`    | Lint the project             |

## Deployment

The backend includes a `vercel.json` and exports the Express `app` for serverless deployment on Vercel. Set the same environment variables in your Vercel project settings.

## License

ISC
