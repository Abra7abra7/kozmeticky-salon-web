-- Create blog_posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  categories TEXT[],
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone for published posts
CREATE POLICY "Allow public read access to published posts" ON blog_posts
  FOR SELECT
  USING (published = true);

-- Allow admin to read all posts
CREATE POLICY "Allow admin read access to all posts" ON blog_posts
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow admin to insert, update, delete posts
CREATE POLICY "Allow admin full access" ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated');
