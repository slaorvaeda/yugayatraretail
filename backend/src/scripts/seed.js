import { supabase } from '../config/supabaseClient.js';
import { hashPassword } from '../utils/password.js';

const adminUsers = [
  {
    full_name: 'Staff Lead',
    email: 'staff@yugayatra.com',
    phone: '+910000000001'
  }
];

const internUsers = [
  {
    full_name: 'Aditi Sharma',
    email: 'aditi.sharma@example.com',
    phone: '+919876543210',
    batch: 'Spring 2025',
    resume_url: 'https://example.com/resume/aditi.pdf',
    meet_link: 'https://meet.google.com/aditi-room',
    offer_letter_url: 'https://example.com/documents/aditi-offer-letter.pdf',
    completion_certificate_url: 'https://example.com/documents/aditi-completion.pdf',
    activation_status: 'active'
  },
  {
    full_name: 'Ravi Kumar',
    email: 'ravi.kumar@example.com',
    phone: '+919123456789',
    batch: 'Spring 2025',
    resume_url: 'https://example.com/resume/ravi.pdf',
    meet_link: 'https://meet.google.com/ravi-room',
    offer_letter_url: 'https://example.com/documents/ravi-offer-letter.pdf',
    completion_certificate_url: 'https://example.com/documents/ravi-completion.pdf',
    activation_status: 'pending'
  }
];

async function upsertUser(user, role) {
  const passwordHash = await hashPassword('Password@123');

  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        role,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        password_hash: passwordHash,
        status: role === 'admin' ? 'active' : user.activation_status || 'pending'
      },
      { onConflict: 'email', ignoreDuplicates: false }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function seed() {
  try {
    console.log('🌱 Seeding admin user...');
    for (const admin of adminUsers) {
      await upsertUser(admin, 'admin');
    }

    console.log('🌱 Seeding intern users and profiles...');
    for (const intern of internUsers) {
      const user = await upsertUser(intern, 'intern');

      const { error: profileError } = await supabase
        .from('intern_profiles')
        .upsert(
          {
            intern_id: user.id,
            batch: intern.batch,
            resume_url: intern.resume_url,
            meet_link: intern.meet_link,
            offer_letter_url: intern.offer_letter_url,
            completion_certificate_url: intern.completion_certificate_url,
            activation_status: intern.activation_status || 'pending'
          },
          { onConflict: 'intern_id', ignoreDuplicates: false }
        );

      if (profileError) {
        throw profileError;
      }
    }

    console.log('✅ Seed completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
