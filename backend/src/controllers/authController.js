import { ZodError } from 'zod';
import { registerSchema, loginSchema } from '../validators/authValidators.js';
import { supabase } from '../config/supabaseClient.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signToken } from '../utils/token.js';

const formatUser = (user, profile) => ({
  id: user.id,
  role: user.role,
  fullName: user.full_name,
  email: user.email,
  phone: user.phone,
  status: user.status,
  avatarUrl: user.avatar_url,
  internProfile: profile ? {
    batch: profile.batch,
    resumeUrl: profile.resume_url,
    meetLink: profile.meet_link,
    activationStatus: profile.activation_status
  } : undefined
});

export const register = async (req, res, next) => {
  try {
    const payload = registerSchema.parse({
      ...req.body,
      role: req.body.role || 'intern'
    });

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', payload.email)
      .maybeSingle();

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await hashPassword(payload.password);

    const { data: insertedUser, error: userError } = await supabase
      .from('users')
      .insert({
        role: payload.role,
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        password_hash: passwordHash,
        status: payload.role === 'admin' ? 'active' : 'pending'
      })
      .select()
      .single();

    if (userError) {
      throw userError;
    }

    let profile;

    if (payload.role === 'intern') {
      if (!req.file?.path) {
        return res.status(400).json({ message: 'Resume upload is required for interns' });
      }
      const resumeUrl = req.file?.path;
      const { data: profileData, error: profileError } = await supabase
        .from('intern_profiles')
        .insert({
          intern_id: insertedUser.id,
          batch: payload.batch || null,
          resume_url: resumeUrl || null,
          meet_link: payload.meetLink || null,
          activation_status: 'pending'
        })
        .select()
        .single();

      if (profileError) {
        throw profileError;
      }

      profile = profileData;
    }

    const token = signToken({
      id: insertedUser.id,
      role: insertedUser.role,
      email: insertedUser.email
    });

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: formatUser(insertedUser, profile)
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', issues: error.issues });
    }
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);

    const { data: user, error } = await supabase
      .from('users')
      .select('id, role, full_name, email, phone, status, avatar_url, password_hash')
      .eq('email', payload.email)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await comparePassword(payload.password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let profile;
    if (user.role === 'intern') {
      const { data: profileData } = await supabase
        .from('intern_profiles')
        .select('batch, resume_url, meet_link, activation_status')
        .eq('intern_id', user.id)
        .maybeSingle();
      profile = profileData || undefined;
    }

    const token = signToken({ id: user.id, role: user.role, email: user.email });

    return res.json({
      message: 'Login successful',
      token,
      user: formatUser(user, profile)
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', issues: error.issues });
    }
    return next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, role, full_name, email, phone, status, avatar_url')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profile;
    if (user.role === 'intern') {
      const { data: profileData } = await supabase
        .from('intern_profiles')
        .select('batch, resume_url, meet_link, activation_status')
        .eq('intern_id', user.id)
        .maybeSingle();
      profile = profileData || undefined;
    }

    return res.json({ user: formatUser(user, profile) });
  } catch (error) {
    return next(error);
  }
};

