import jwt from 'jsonwebtoken';

// Test utility for refresh token API
export class RefreshTokenTester {
  private accessSecret: string;
  private refreshSecret: string;

  constructor(accessSecret: string, refreshSecret: string) {
    this.accessSecret = accessSecret;
    this.refreshSecret = refreshSecret;
  }

  // Generate a valid refresh token for testing
  generateRefreshToken(user: { id: string; email: string }) {
    return jwt.sign(
      { id: user.id, email: user.email },
      this.refreshSecret,
      { expiresIn: '7d' }
    );
  }

  // Generate an expired refresh token for testing
  generateExpiredRefreshToken(user: { id: string; email: string }) {
    return jwt.sign(
      { id: user.id, email: user.email },
      this.refreshSecret,
      { expiresIn: '-1h' } // Already expired
    );
  }

  // Generate an invalid refresh token for testing
  generateInvalidRefreshToken() {
    return jwt.sign(
      { id: 'test', email: 'test@test.com' },
      'wrong-secret',
      { expiresIn: '7d' }
    );
  }

  // Test cases
  async testRefreshTokenAPI() {
    const baseUrl = 'http://localhost:3000/api/auth/refresh';
    
    console.log('🧪 Testing Refresh Token API...\n');

    // Test 1: Valid refresh token
    console.log('Test 1: Valid refresh token');
    const validToken = this.generateRefreshToken({ id: '1', email: 'john@example.com' });
    await this.makeRequest(baseUrl, validToken);

    // Test 2: No refresh token
    console.log('\nTest 2: No refresh token');
    await this.makeRequest(baseUrl, null);

    // Test 3: Invalid refresh token
    console.log('\nTest 3: Invalid refresh token');
    const invalidToken = this.generateInvalidRefreshToken();
    await this.makeRequest(baseUrl, invalidToken);

    // Test 4: Expired refresh token
    console.log('\nTest 4: Expired refresh token');
    const expiredToken = this.generateExpiredRefreshToken({ id: '1', email: 'john@example.com' });
    await this.makeRequest(baseUrl, expiredToken);
  }

  private async makeRequest(url: string, token: string | null) {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Cookie'] = `refreshToken=${token}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
      });

      const data = await response.json();
      
      console.log(`Status: ${response.status}`);
      console.log(`Response:`, data);
      
      if (response.ok && data.accessToken) {
        console.log('✅ Success! New access token generated');
        // Verify the new token
        try {
          const decoded = jwt.verify(data.accessToken, this.accessSecret) as any;
          console.log('🔍 Decoded token:', decoded);
        } catch (err) {
          console.log('❌ Failed to verify new access token');
        }
      }
    } catch (error) {
      console.log('❌ Request failed:', error);
    }
  }
}

// Example usage
export const testRefreshToken = () => {
  // You need to set these in your .env.local file
  const accessSecret = process.env.ACCESS_SECRET || 'test-access-secret';
  const refreshSecret = process.env.REFRESH_SECRET || 'test-refresh-secret';
  
  const tester = new RefreshTokenTester(accessSecret, refreshSecret);
  return tester.testRefreshTokenAPI();
};
