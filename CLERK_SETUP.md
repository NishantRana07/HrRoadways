# Clerk Authentication Setup

This project now uses Clerk for authentication with a simplified single-modal approach. Follow these steps to set up Clerk:

## 1. Create a Clerk Account
- Go to [https://dashboard.clerk.dev](https://dashboard.clerk.dev)
- Sign up for a free account
- Create a new application

## 2. Get Your Clerk Keys
From your Clerk dashboard:
- Copy your **Publishable Key**
- Copy your **Secret Key**

## 3. Update Environment Variables
Update the `.env.local` file in your project root:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

## 4. Configure Clerk Settings (Optional)
In your Clerk dashboard, you can customize:
- Social login providers (Google, GitHub, etc.)
- User profile fields
- Email templates
- Sign-in/sign-up flows

## 5. Test Your Authentication
1. Start your development server: `npm run dev`
2. Click the "Login" button
3. Clerk will handle both login and registration in the same modal

## Features Implemented
- ✅ User registration and login in single modal
- ✅ Social authentication (Google) - configurable in Clerk dashboard
- ✅ Password reset functionality (handled within login modal)
- ✅ User session management
- ✅ Protected routes
- ✅ User profile management
- ✅ Sign out functionality

## Simplified Authentication Flow
The authentication has been streamlined to use only:
- **Login.jsx** - Uses Clerk's SignIn component (handles both login and registration)
- **nav.jsx** - Single "Login" button that opens the unified auth modal
- **ProtectedRoute.jsx** - Uses Clerk's authentication state
- **Userprofile.jsx** - Uses Clerk's user data

## Benefits of Single Modal Approach
- ✅ Cleaner UI with less buttons
- ✅ Users can switch between login/register within the same modal
- ✅ Clerk handles all authentication flows seamlessly
- ✅ Password reset integrated into the login flow
- ✅ Consistent user experience
