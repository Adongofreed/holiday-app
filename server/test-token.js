// Test if your token is working
const token = 'c26ac81ecd4a4e006be88d005e13425c3eca601d7c95b1e89fabf8fe7cdb7554'; // ← Paste your token here

async function testToken() {
  console.log('🔐 Testing admin token...\n');
  
  // Test 1: Check token format
  console.log('1. Token format:');
  console.log(`   Length: ${token.length} characters`);
  console.log(`   Starts with: ${token.substring(0, 10)}...`);
  console.log(`   Ends with: ...${token.substring(token.length - 10)}`);
  
  // Test 2: Try to access admin endpoint
  console.log('\n2. Testing API endpoint:');
  try {
    const response = await fetch('https://holiday-backend.onrender.com/api/admin/subscriptions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log(`   Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ SUCCESS! Token is valid');
      console.log(`   Subscribers: ${data.count}`);
    } else if (response.status === 401) {
      console.log('   ❌ FAILED: Invalid token (401 Unauthorized)');
      const error = await response.json();
      console.log(`   Error: ${error.error}`);
    } else {
      console.log(`   ⚠️  Unexpected status: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Network error: ${error.message}`);
    console.log('   Make sure backend is running on port 5000');
  }
  
  // Test 3: Check .env file
  console.log('\n3. Checking .env file:');
  const fs = require('fs');
  const path = require('path');
  
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const adminTokenLine = envContent.split('\n').find(line => line.startsWith('ADMIN_TOKEN='));
    
    if (adminTokenLine) {
      const envToken = adminTokenLine.split('=')[1];
      console.log(`   Found ADMIN_TOKEN in .env`);
      const safeEnv = (envToken || '').toString();
      console.log(`   Env token length: ${safeEnv.length}`);
      console.log(`   Env token starts with: ${safeEnv.substring(0, 10)}...`);
      
      if (envToken === token) {
        console.log('   ✅ Tokens match!');
      } else {
        console.log('   ❌ Tokens DO NOT match!');
        console.log('   The token in .env is different from what you\'re using');
      }
    } else {
      console.log('   ❌ ADMIN_TOKEN not found in .env file');
    }
  } else {
    console.log('   ❌ .env file not found');
  }
}

testToken();