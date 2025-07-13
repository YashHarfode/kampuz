# Firebase Setup Instructions

## Problem

The application is experiencing "Missing or insufficient permissions" errors because Firestore security rules are not configured.

## Solution

Deploy the Firestore security rules that have been created in this project.

## Steps to Fix

### Option 1: Using Firebase CLI (Recommended)

1. **Install Firebase CLI** (if not already installed):

   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:

   ```bash
   firebase login
   ```

3. **Initialize Firebase in the project** (if not already done):

   ```bash
   firebase init
   ```

   - Select "Firestore" and "Storage"
   - Choose your existing project: `internnest-ae0d1`
   - Use the existing `firestore.rules` file
   - Use the existing `firestore.indexes.json` file
   - Use the existing `storage.rules` file

4. **Deploy the rules**:
   ```bash
   firebase deploy --only firestore:rules,storage
   ```

### Option 2: Using Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `internnest-ae0d1`
3. Navigate to **Firestore Database** → **Rules**
4. Copy the content from `firestore.rules` and paste it in the rules editor
5. Click **Publish**
6. Navigate to **Storage** → **Rules**
7. Copy the content from `storage.rules` and paste it in the rules editor
8. Click **Publish**

## What the Rules Allow

The security rules created allow:

- **Public reading** of notes, marketplace items, events, and doubts for educational sharing
- **Authenticated users** can create and manage their own content
- **Proper data validation** to ensure data integrity
- **Nested collections** for answers and applicants with appropriate permissions

## Files Created

- `firestore.rules` - Security rules for Firestore
- `storage.rules` - Security rules for Firebase Storage
- `firebase.json` - Firebase project configuration
- `firestore.indexes.json` - Database indexes for better performance

## Testing

After deploying the rules, the application should work without permission errors. The app includes graceful error handling that shows empty lists while rules are being deployed.
