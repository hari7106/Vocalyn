-- Create interviews table in Supabase
-- Run this SQL in your Supabase project's SQL editor

CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  job_position VARCHAR(255),
  job_description TEXT,
  interview_type VARCHAR(255),
  duration INTEGER,
  score DECIMAL(3, 1),
  summary TEXT,
  strengths TEXT[] DEFAULT ARRAY[]::text[],
  improvements TEXT[] DEFAULT ARRAY[]::text[],
  insights TEXT[] DEFAULT ARRAY[]::text[],
  transcript JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_email for faster queries
CREATE INDEX IF NOT EXISTS idx_interviews_user_email ON public.interviews(user_email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_interviews_created_at ON public.interviews(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow users to view only their own interviews
CREATE POLICY "Users can view their own interviews" 
ON public.interviews 
FOR SELECT 
USING (user_email = current_user_email());

CREATE POLICY "Users can insert their own interviews" 
ON public.interviews 
FOR INSERT 
WITH CHECK (user_email = current_user_email());

CREATE POLICY "Users can update their own interviews" 
ON public.interviews 
FOR UPDATE 
USING (user_email = current_user_email());

-- Note: For RLS policies to work properly, you need to set the user email in JWT claims
-- Or use a simpler approach without RLS if you handle authentication differently
