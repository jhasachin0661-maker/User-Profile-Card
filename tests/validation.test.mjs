import test from 'node:test';
import assert from 'node:assert/strict';

// Test validation logic
const URL_PATTERN = /^(https?:\/\/)([\w.-]+)+(:\d+)?(\/[^\s]*)?$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field, value) {
  const trimmed = value.trim();

  switch (field) {
    case 'name':
      if (!trimmed) return 'Full name is required';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      if (trimmed.length > 50) return 'Name cannot exceed 50 characters';
      return null;
    case 'role':
      if (trimmed.length > 60) return 'Role/Designation cannot exceed 60 characters';
      return null;
    case 'bio':
      if (trimmed.length > 180) return 'Biography cannot exceed 180 characters';
      return null;
    case 'location':
      if (trimmed.length > 60) return 'Location cannot exceed 60 characters';
      return null;
    case 'email':
      if (trimmed && !EMAIL_PATTERN.test(trimmed)) return 'Please enter a valid email address';
      return null;
    case 'imageUrl':
    case 'website':
    case 'linkedin':
    case 'github':
      if (trimmed && !URL_PATTERN.test(trimmed)) return 'URL must start with http:// or https://';
      return null;
    default:
      return null;
  }
}

test('Validation: Name field', () => {
  assert.equal(validateField('name', ''), 'Full name is required');
  assert.equal(validateField('name', 'A'), 'Name must be at least 2 characters');
  assert.equal(validateField('name', 'Alex Morgan'), null);
  assert.equal(validateField('name', 'A'.repeat(51)), 'Name cannot exceed 50 characters');
});

test('Validation: Role field', () => {
  assert.equal(validateField('role', ''), null);
  assert.equal(validateField('role', 'Frontend Engineer'), null);
  assert.equal(validateField('role', 'R'.repeat(61)), 'Role/Designation cannot exceed 60 characters');
});

test('Validation: Bio field', () => {
  assert.equal(validateField('bio', ''), null);
  assert.equal(validateField('bio', 'Hello world'), null);
  assert.equal(validateField('bio', 'B'.repeat(181)), 'Biography cannot exceed 180 characters');
});

test('Validation: Email field', () => {
  assert.equal(validateField('email', ''), null);
  assert.equal(validateField('email', 'alex@example.com'), null);
  assert.equal(validateField('email', 'not-an-email'), 'Please enter a valid email address');
});

test('Validation: URL fields (imageUrl, website, linkedin, github)', () => {
  for (const field of ['imageUrl', 'website', 'linkedin', 'github']) {
    assert.equal(validateField(field, ''), null);
    assert.equal(validateField(field, 'https://example.com'), null);
    assert.equal(validateField(field, 'http://example.com/profile'), null);
    assert.equal(validateField(field, 'ftp://invalid.com') !== null, true);
    assert.equal(validateField(field, 'javascript:alert(1)') !== null, true);
  }
});
