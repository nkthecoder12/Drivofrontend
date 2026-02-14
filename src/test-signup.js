// Simple test script to verify signup functionality
// This can be run in the browser console

import { mockAuthApi } from './lib/mock-api.js';

async function testSignup() {
  console.log('Testing signup functionality...');
  
  try {
    // Test successful signup
    const result = await mockAuthApi.signup({
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      password: 'password123'
    });
    
    console.log('✅ Signup successful:', result.data);
    
    // Test duplicate email
    try {
      await mockAuthApi.signup({
        name: 'Test User 2',
        email: 'test@example.com', // Same email
        phone: '+1234567891',
        password: 'password123'
      });
      console.log('❌ Duplicate email test failed - should have thrown error');
    } catch (error) {
      console.log('✅ Duplicate email correctly rejected:', error.response.data);
    }
    
    // Test login with new user
    const loginResult = await mockAuthApi.login('test@example.com', 'password123');
    console.log('✅ Login successful:', loginResult.data);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run test if in browser
if (typeof window !== 'undefined') {
  window.testSignup = testSignup;
  console.log('Test function available as window.testSignup()');
}
