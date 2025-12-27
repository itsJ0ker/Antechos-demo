-- Add category field to marketplace_teams table
ALTER TABLE marketplace_teams ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';

-- Update existing teams with sample categories
UPDATE marketplace_teams SET category = 'Leadership' WHERE role IN ('CEO', 'CTO', 'COO', 'VP');
UPDATE marketplace_teams SET category = 'Engineering' WHERE role LIKE '%Engineer%' OR role LIKE '%Developer%' OR role LIKE '%Tech%';
UPDATE marketplace_teams SET category = 'Design' WHERE role LIKE '%Design%' OR role LIKE '%UX%' OR role LIKE '%UI%';
UPDATE marketplace_teams SET category = 'Marketing' WHERE role LIKE '%Marketing%' OR role LIKE '%Sales%' OR role LIKE '%Business%';
UPDATE marketplace_teams SET category = 'Operations' WHERE role LIKE '%Operations%' OR role LIKE '%Manager%' OR role LIKE '%Coordinator%';

-- Add some sample data with different categories if table is empty
INSERT INTO marketplace_teams (name, role, category, image_url, order_index) VALUES
('John Smith', 'Lead Developer', 'Engineering', 'https://i.pravatar.cc/200?img=1', 1),
('Sarah Johnson', 'UX Designer', 'Design', 'https://i.pravatar.cc/200?img=2', 2),
('Mike Chen', 'Product Manager', 'Leadership', 'https://i.pravatar.cc/200?img=3', 3),
('Emily Davis', 'Marketing Director', 'Marketing', 'https://i.pravatar.cc/200?img=4', 4),
('David Wilson', 'DevOps Engineer', 'Engineering', 'https://i.pravatar.cc/200?img=5', 5),
('Lisa Brown', 'UI Designer', 'Design', 'https://i.pravatar.cc/200?img=6', 6),
('Tom Anderson', 'Sales Manager', 'Marketing', 'https://i.pravatar.cc/200?img=7', 7),
('Anna Martinez', 'Operations Lead', 'Operations', 'https://i.pravatar.cc/200?img=8', 8)
ON CONFLICT (id) DO NOTHING;