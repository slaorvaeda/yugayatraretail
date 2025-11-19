import { ZodError } from 'zod';
import { supabase } from '../config/supabaseClient.js';
import {
  updateInternStatusSchema,
  routineEntrySchema,
  progressionSchema
} from '../validators/adminValidators.js';
import { isValidUUID } from '../middleware/security.js';

export const getDashboardSummary = async (_req, res, next) => {
  try {
    const [internTotals, activeTotals, pendingTotals] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'intern'),
      supabase.from('intern_profiles').select('*', { count: 'exact', head: true }).eq('activation_status', 'active'),
      supabase.from('intern_profiles').select('*', { count: 'exact', head: true }).eq('activation_status', 'pending')
    ]);

    if (internTotals.error) throw internTotals.error;
    if (activeTotals.error) throw activeTotals.error;
    if (pendingTotals.error) throw pendingTotals.error;

    const { data: routineStats } = await supabase.rpc('get_routine_status_counts');

    return res.json({
      totals: {
        interns: internTotals.count || 0,
        activeInterns: activeTotals.count || 0,
        pendingInterns: pendingTotals.count || 0
      },
      routineStats: routineStats || []
    });
  } catch (error) {
    return next(error);
  }
};

export const listInterns = async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('intern_directory_view')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return res.json({ interns: data || [] });
  } catch (error) {
    return next(error);
  }
};

export const updateInternStatus = async (req, res, next) => {
  try {
    const payload = updateInternStatusSchema.parse(req.body);
    const internId = req.params.internId;

    // Validate internId format
    if (!isValidUUID(internId)) {
      return res.status(400).json({ message: 'Invalid intern ID format' });
    }

    // Verify intern exists and is actually an intern
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', internId)
      .eq('role', 'intern')
      .maybeSingle();

    if (userError || !user) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    const { data: profile, error: profileError } = await supabase
      .from('intern_profiles')
      .update({
        activation_status: payload.activationStatus,
        meet_link: payload.meetLink || null,
        admin_notes: payload.notes || null,
        activated_at: payload.activationStatus === 'active' ? new Date().toISOString() : null
      })
      .eq('intern_id', internId)
      .select()
      .single();

    if (profileError) {
      throw profileError;
    }

    await supabase
      .from('users')
      .update({ status: payload.activationStatus === 'active' ? 'active' : payload.activationStatus })
      .eq('id', internId);

    return res.json({
      message: 'Intern status updated',
      profile
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', issues: error.issues });
    }
    return next(error);
  }
};

export const addRoutineEntry = async (req, res, next) => {
  try {
    const payload = routineEntrySchema.parse(req.body);
    const internId = req.params.internId;

    // Validate internId format
    if (!isValidUUID(internId)) {
      return res.status(400).json({ message: 'Invalid intern ID format' });
    }

    // Verify intern exists
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('id', internId)
      .eq('role', 'intern')
      .maybeSingle();

    if (!user) {
      return res.status(404).json({ message: 'Intern not found' });
    }

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
        created_by: req.user.id
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      message: 'Routine entry added',
      routine: data
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', issues: error.issues });
    }
    return next(error);
  }
};

export const addProgression = async (req, res, next) => {
  try {
    const payload = progressionSchema.parse(req.body);
    const internId = req.params.internId;

    // Validate internId format
    if (!isValidUUID(internId)) {
      return res.status(400).json({ message: 'Invalid intern ID format' });
    }

    // Verify intern exists
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('id', internId)
      .eq('role', 'intern')
      .maybeSingle();

    if (!user) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    const { data, error } = await supabase
      .from('intern_progression')
      .insert({
        intern_id: internId,
        milestone: payload.milestone,
        description: payload.description,
        progress_percent: payload.progressPercent,
        target_date: payload.targetDate,
        created_by: req.user.id
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      message: 'Progression entry added',
      progression: data
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', issues: error.issues });
    }
    return next(error);
  }
};

