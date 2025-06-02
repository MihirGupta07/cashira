# Mobile Authentication Debugging Guide

## Changes Made to Fix Mobile Auth

### 1. Improved Mobile Detection
- Updated `useAuthApi.ts` to detect ALL mobile devices, not just mobile Safari
- Now uses `signInWithRedirect` for all mobile devices instead of just mobile Safari
- Added better fallback handling for popup failures

### 2. Enhanced Error Handling
- Added more specific error codes for popup failures
- Improved logging for debugging mobile issues
- Better loading state management for mobile redirects

### 3. Debug Information
- Added debug info to login page (development mode only)
- Shows user agent, device detection results, and screen size

## Testing Mobile Authentication

### 1. Check the Debug Info
1. Open the login page on your mobile device
2. Look for the "Debug Info" section (only shows in development)
3. Verify that mobile detection is working correctly

### 2. Common Mobile Issues and Solutions

#### Issue: Authentication not working on mobile browsers
**Solution**: The updated code now uses redirect for all mobile devices

#### Issue: Popup blocked on mobile
**Solution**: Automatic fallback to redirect when popup fails

#### Issue: Redirect not working properly
**Possible causes**:
1. **Firebase Auth Domain**: Make sure your Firebase project has the correct authorized domains
2. **HTTPS**: Ensure your app is served over HTTPS in production
3. **Environment Variables**: Verify all Firebase config env vars are set correctly

### 3. Firebase Console Checklist

Ensure these are configured in your Firebase Console:

1. **Authentication > Sign-in method > Google**:
   - Status: Enabled
   - Web SDK configuration: Properly configured

2. **Authentication > Settings > Authorized domains**:
   - Add your domain (e.g., yourapp.com)
   - Add localhost for development

3. **Google Cloud Console OAuth**:
   - Authorized JavaScript origins: Include your domain
   - Authorized redirect URIs: Include your auth domain

### 4. Environment Variables to Check

Ensure these are set in your `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### 5. Testing Steps

1. **Desktop Testing**:
   - Should use popup authentication
   - Check browser console for any errors

2. **Mobile Testing**:
   - Should use redirect authentication
   - After clicking "Sign in with Google", user should be redirected to Google
   - After successful auth, should return to your app and redirect to dashboard

### 6. Console Logs to Watch

Look for these logs in the browser console:
- "Is mobile device: true/false"
- "Using redirect for mobile device" or "Using popup for desktop"
- "Handling redirect result for mobile"
- Any error messages

### 7. Common Error Messages and Solutions

- **"auth/popup-blocked"**: Normal on mobile, should trigger redirect fallback
- **"auth/cancelled-popup-request"**: User closed popup, should trigger redirect fallback
- **"auth/redirect-cancelled-by-user"**: User cancelled during redirect flow
- **"auth/network-request-failed"**: Check internet connection and Firebase config

## If Still Not Working

1. Check browser console for specific error messages
2. Verify Firebase configuration in Google Cloud Console
3. Test with different mobile browsers
4. Ensure your app is served over HTTPS in production
5. Check if ad blockers or privacy settings are interfering 