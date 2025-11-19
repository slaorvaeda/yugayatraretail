import { ZodError } from 'zod';
import { supabase } from '../config/supabaseClient.js';
import { routineEntrySchema, progressionSchema } from '../validators/adminValidators.js';

import { isValidUUID } from '../middleware/security.js';

export const getInternDashboard = async (req, res, next) => {
  try {
    let internId;
    
    if (req.user.role === 'admin') {
      // Admin can access any intern's dashboard
      internId = req.params.internId;
      
      // Validate internId format
      if (!isValidUUID(internId)) {
        return res.status(400).json({ message: 'Invalid intern ID format' });
      }
      
      // Verify the user is actually an intern
      const { data: user } = await supabase
        .from('users')
        .select('id, role')
        .eq('id', internId)
        .eq('role', 'intern')
        .maybeSingle();
        
      if (!user) {
        return res.status(404).json({ message: 'Intern not found' });
      }
    } else {
      // Interns can only access their own dashboard
      internId = req.user.id;
    }

    const [
      { data: user, error: userError },
      { data: profile, error: profileError },
      { data: routines },
      { data: progression }
    ] = await Promise.all([
      supabase
        .from('users')
        .select('id, full_name, email, phone, status, created_at')
        .eq('id', internId)
        .maybeSingle(),
      supabase
        .from('intern_profiles')
        .select(
          'batch, resume_url, meet_link, offer_letter_url, completion_certificate_url, activation_status, admin_notes, activated_at, updated_at'
        )
        .eq('intern_id', internId)
        .maybeSingle(),
      supabase
        .from('intern_routines')
        .select('*')
        .eq('intern_id', internId)
        .order('date', { ascending: false })
        .limit(30),
      supabase
        .from('intern_progression')
        .select('*')
        .eq('intern_id', internId)
        .order('created_at', { ascending: false })
        .limit(30)
    ]);

    if (userError) throw userError;
    if (profileError) throw profileError;

    return res.json({
      user,
      profile,
      routines: routines || [],
      progression: progression || []
    });
  } catch (error) {
    return next(error);
  }
};

export const submitRoutineUpdate = async (req, res, next) => {
  try {
    const payload = routineEntrySchema.parse(req.body);
    const internId = req.user.id;

    const { data, error } = await supabase
      .from('intern_routines')
      .insert({
        intern_id: internId,
        date: payload.date,
        title: payload.title,
        summary: payload.summary,
        status: payload.status,
        hours_spent: payload.hoursSpent,
        blockers: payload.blockers || null,
        created_by: internId
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      message: 'Routine update submitted',
      routine: data
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', issues: error.issues });
    }
    return next(error);
  }
};

export const submitProgressUpdate = async (req, res, next) => {
  try {
    const payload = progressionSchema.parse(req.body);
    const internId = req.user.id;

    const { data, error } = await supabase
      .from('intern_progression')
      .insert({
        intern_id: internId,
        milestone: payload.milestone,
        description: payload.description,
        progress_percent: payload.progressPercent,
        target_date: payload.targetDate,
        created_by: internId
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      message: 'Progress update submitted',
      progression: data
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', issues: error.issues });
    }
    return next(error);
  }
};

