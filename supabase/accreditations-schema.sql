-- Accreditations Master Table and University Relationships
-- This allows admins to manage all accreditations and assign them to universities

-- Master accreditations table (all available accreditations)
CREATE TABLE IF NOT EXISTS public.accreditations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    full_name TEXT,
    logo_url TEXT,
    description TEXT,
    website_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University accreditations junction table (which accreditations each university has)
CREATE TABLE IF NOT EXISTS public.university_accreditations (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    accreditation_id INTEGER REFERENCES accreditations(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(university_id, accreditation_id)
);

-- Insert common accreditations
INSERT INTO accreditations (name, full_name, logo_url, description, display_order, is_active) VALUES
('UGC', 'University Grants Commission', 'https://example.com/logos/ugc.png', 'Statutory body for coordination, determination and maintenance of standards of university education', 1, true),
('AICTE', 'All India Council for Technical Education', 'https://example.com/logos/aicte.png', 'National level council for technical education', 2, true),
('NAAC', 'National Assessment and Accreditation Council', 'https://example.com/logos/naac.png', 'Autonomous body for assessment and accreditation of higher education institutions', 3, true),
('NBA', 'National Board of Accreditation', 'https://example.com/logos/nba.png', 'Accreditation body for technical education programs', 4, true),
('WES', 'World Education Services', 'https://example.com/logos/wes.png', 'International credential evaluation service', 5, true),
('AIU', 'Association of Indian Universities', 'https://example.com/logos/aiu.png', 'Association representing universities in India', 6, true),
('IACBE', 'International Accreditation Council for Business Education', 'https://example.com/logos/iacbe.png', 'Specialized accreditation for business programs', 7, true),
('ACBSP', 'Accreditation Council for Business Schools and Programs', 'https://example.com/logos/acbsp.png', 'Global accreditation for business education', 8, true),
('PCI', 'Pharmacy Council of India', 'https://example.com/logos/pci.png', 'Statutory body for pharmacy education', 9, true),
('BCI', 'Bar Council of India', 'https://example.com/logos/bci.png', 'Regulatory body for legal education', 10, true),
('NIRF', 'National Institutional Ranking Framework', 'https://example.com/logos/nirf.png', 'Ranking framework for higher education institutions', 11, true),
('QS', 'QS World University Rankings', 'https://example.com/logos/qs.png', 'Global university ranking system', 12, true),
('AUAP', 'Association of Universities of Asia and the Pacific', 'https://example.com/logos/auap.png', 'Network of universities in Asia-Pacific region', 13, true);

-- Create indexes
CREATE INDEX idx_accreditations_active ON accreditations(is_active);
CREATE INDEX idx_university_accreditations_university ON university_accreditations(university_id);
CREATE INDEX idx_university_accreditations_accreditation ON university_accreditations(accreditation_id);

-- Add updated_at trigger
CREATE TRIGGER update_accreditations_updated_at 
    BEFORE UPDATE ON accreditations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE accreditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_accreditations ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access" ON accreditations FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON university_accreditations FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "Admin full access" ON accreditations FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON university_accreditations FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
