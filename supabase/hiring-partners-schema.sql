-- =====================================================
-- HIRING PARTNERS MANAGEMENT SYSTEM
-- Similar to Accreditations System
-- =====================================================

-- 1. Global Hiring Partners Table (Master List)
CREATE TABLE IF NOT EXISTS hiring_partners (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  website_url TEXT,
  industry TEXT, -- e.g., 'Technology', 'Finance', 'Healthcare'
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. University-Hiring Partners Junction Table
CREATE TABLE IF NOT EXISTS university_hiring_partners_new (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT REFERENCES universities(id) ON DELETE CASCADE,
  hiring_partner_id BIGINT REFERENCES hiring_partners(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(university_id, hiring_partner_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hiring_partners_active ON hiring_partners(is_active);
CREATE INDEX IF NOT EXISTS idx_university_hiring_partners_university ON university_hiring_partners_new(university_id);
CREATE INDEX IF NOT EXISTS idx_university_hiring_partners_partner ON university_hiring_partners_new(hiring_partner_id);

-- Enable Row Level Security
ALTER TABLE hiring_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_hiring_partners_new ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public can view hiring partners" ON hiring_partners FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view university hiring partners" ON university_hiring_partners_new FOR SELECT USING (true);

-- RLS Policies for admin write access
CREATE POLICY "Admins can manage hiring partners" ON hiring_partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage university hiring partners" ON university_hiring_partners_new FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample hiring partners
INSERT INTO hiring_partners (name, logo_url, website_url, industry, description) VALUES
('Google', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', 'https://www.google.com', 'Technology', 'Leading technology company'),
('Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', 'https://www.microsoft.com', 'Technology', 'Global technology leader'),
('Amazon', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', 'https://www.amazon.com', 'E-commerce', 'E-commerce and cloud computing giant'),
('IBM', 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', 'https://www.ibm.com', 'Technology', 'Technology and consulting services'),
('Accenture', 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg', 'https://www.accenture.com', 'Consulting', 'Global professional services company'),
('Deloitte', 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg', 'https://www.deloitte.com', 'Consulting', 'Professional services network'),
('TCS', 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg', 'https://www.tcs.com', 'Technology', 'IT services and consulting'),
('Infosys', 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg', 'https://www.infosys.com', 'Technology', 'IT services and consulting'),
('Wipro', 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg', 'https://www.wipro.com', 'Technology', 'IT services and consulting'),
('Cognizant', 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Cognizant_logo_2022.svg', 'https://www.cognizant.com', 'Technology', 'IT services and consulting'),
('HCL Technologies', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/HCL_Technologies_logo.svg', 'https://www.hcltech.com', 'Technology', 'IT services and consulting'),
('Tech Mahindra', 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Tech_Mahindra_New_Logo.svg', 'https://www.techmahindra.com', 'Technology', 'IT services and consulting'),
('Capgemini', 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Capgemini_201x_logo.svg', 'https://www.capgemini.com', 'Consulting', 'Consulting and technology services'),
('Oracle', 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg', 'https://www.oracle.com', 'Technology', 'Database and cloud solutions'),
('SAP', 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg', 'https://www.sap.com', 'Technology', 'Enterprise software'),
('Cisco', 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg', 'https://www.cisco.com', 'Technology', 'Networking and telecommunications'),
('Intel', 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg', 'https://www.intel.com', 'Technology', 'Semiconductor manufacturing'),
('Adobe', 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg', 'https://www.adobe.com', 'Technology', 'Software and creative tools'),
('Salesforce', 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg', 'https://www.salesforce.com', 'Technology', 'CRM and cloud computing'),
('HDFC Bank', 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg', 'https://www.hdfcbank.com', 'Finance', 'Banking and financial services'),
('ICICI Bank', 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg', 'https://www.icicibank.com', 'Finance', 'Banking and financial services'),
('Axis Bank', 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg', 'https://www.axisbank.com', 'Finance', 'Banking and financial services'),
('Flipkart', 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg', 'https://www.flipkart.com', 'E-commerce', 'E-commerce platform'),
('Paytm', 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg', 'https://www.paytm.com', 'Fintech', 'Digital payments and financial services')
ON CONFLICT (name) DO NOTHING;

-- Comments
COMMENT ON TABLE hiring_partners IS 'Global master list of hiring partner companies';
COMMENT ON TABLE university_hiring_partners_new IS 'Junction table linking universities to their hiring partners';
