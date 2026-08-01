import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

async function test() {
  const form = new FormData();
  form.append('fullName', 'John Doe');
  form.append('email', 'john@example.com');
  form.append('phone', '1234567890');
  form.append('country', 'USA');
  form.append('currentLocation', 'New York');
  form.append('position', 'Engineer');
  form.append('experience', '5 years');
  
  // Create a dummy 1MB file
  const buffer = Buffer.alloc(1024 * 1024, 'a');
  form.append('resume', buffer, { filename: 'resume.pdf', contentType: 'application/pdf' });

  console.log('Sending request...');
  try {
    const res = await fetch('http://localhost:3000/api/careers', {
      method: 'POST',
      body: form,
    });
    
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (e) {
    console.error('Fetch failed:', e);
  }
}

test();
