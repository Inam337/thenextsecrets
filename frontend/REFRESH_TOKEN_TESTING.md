# Refresh Token API Testing Guide

## 🚀 Quick Start

### 1. Environment Setup
Create `.env.local` file in your app root:
```bash
ACCESS_SECRET=your-super-secret-access-key-here-make-it-long-and-random
REFRESH_SECRET=your-super-secret-refresh-key-here-make-it-different-from-access
```

### 2. Start Your Development Server
```bash
npm run dev
```

## 🧪 Testing Methods

### Method 1: Web Interface (Easiest)
1. Navigate to: `http://localhost:3000/test-refresh`
2. Click "Run All Tests" button
3. View results in real-time

### Method 2: cURL Commands

#### Test 1: No Refresh Token (Should return 401)
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json"
```

#### Test 2: Invalid Refresh Token (Should return 403)
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -H "Cookie: refreshToken=invalid-token-here"
```

#### Test 3: Valid Refresh Token (Should return 200 with new access token)
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -H "Cookie: refreshToken=YOUR_VALID_REFRESH_TOKEN_HERE"
```

### Method 3: Postman Collection

#### Request Setup:
- **Method**: POST
- **URL**: `http://localhost:3000/api/auth/refresh`
- **Headers**: 
  - `Content-Type: application/json`
  - `Cookie: refreshToken=YOUR_TOKEN_HERE`

#### Test Cases:

1. **No Token Test**
   - Remove Cookie header
   - Expected: 401 status, "No refresh token" message

2. **Invalid Token Test**
   - Set Cookie: `refreshToken=invalid-token`
   - Expected: 403 status, "Invalid refresh token" message

3. **Valid Token Test**
   - Set Cookie: `refreshToken=valid-jwt-token`
   - Expected: 200 status, new access token in response

### Method 4: JavaScript/Fetch Testing

```javascript
// Test function
async function testRefreshToken(token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Cookie'] = `refreshToken=${token}`;
  }

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers,
    });
    
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
    
    return { status: response.status, data };
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message };
  }
}

// Usage examples
testRefreshToken(); // No token
testRefreshToken('invalid-token'); // Invalid token
testRefreshToken('valid-jwt-token'); // Valid token
```

## 🔑 Generating Valid Refresh Tokens

To test with valid tokens, you need to generate them using JWT:

```javascript
const jwt = require('jsonwebtoken');

// Generate a valid refresh token
const refreshToken = jwt.sign(
  { id: '1', email: 'john@example.com' },
  process.env.REFRESH_SECRET,
  { expiresIn: '7d' }
);

console.log('Refresh Token:', refreshToken);
```

## 📊 Expected Responses

### Success Response (200)
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### No Token Error (401)
```json
{
  "message": "No refresh token"
}
```

### Invalid Token Error (403)
```json
{
  "message": "Invalid refresh token"
}
```

## 🐛 Common Issues

1. **Environment Variables Not Set**
   - Error: `ACCESS_SECRET` or `REFRESH_SECRET` undefined
   - Solution: Add to `.env.local` file

2. **JWT Package Not Installed**
   - Error: Cannot find module 'jsonwebtoken'
   - Solution: `npm install jsonwebtoken @types/jsonwebtoken`

3. **Invalid Token Format**
   - Error: Invalid refresh token
   - Solution: Ensure token is properly formatted JWT

4. **Cookie Not Set**
   - Error: No refresh token
   - Solution: Include `Cookie: refreshToken=...` header

## 🔧 Advanced Testing

### Test Token Expiration
```javascript
// Generate expired token
const expiredToken = jwt.sign(
  { id: '1', email: 'john@example.com' },
  process.env.REFRESH_SECRET,
  { expiresIn: '-1h' } // Already expired
);
```

### Test Token Verification
```javascript
// Verify the new access token
const decoded = jwt.verify(newAccessToken, process.env.ACCESS_SECRET);
console.log('Decoded token:', decoded);
```

## 📝 Test Checklist

- [ ] Environment variables set
- [ ] Development server running
- [ ] Test no token (401)
- [ ] Test invalid token (403)
- [ ] Test valid token (200)
- [ ] Test expired token (403)
- [ ] Verify new access token is valid
- [ ] Check token expiration (15 minutes)
