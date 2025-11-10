-- Add Accreditation Logos with Fallback Options
-- This script provides multiple logo URL options

-- Option 1: Try to use official logos first
UPDATE accreditations SET 
    logo_url = CASE name
        WHEN 'UGC' THEN 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop'
        WHEN 'AICTE' THEN 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop'
        WHEN 'NAAC' THEN 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop'
        WHEN 'NBA' THEN 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=200&fit=crop'
        WHEN 'WES' THEN 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=200&h=200&fit=crop'
        WHEN 'AIU' THEN 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=200&fit=crop'
        WHEN 'IACBE' THEN 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop'
        WHEN 'ACBSP' THEN 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop'
        WHEN 'PCI' THEN 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop'
        WHEN 'BCI' THEN 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=200&fit=crop'
        WHEN 'NIRF' THEN 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop'
        WHEN 'QS' THEN 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=200&h=200&fit=crop'
        WHEN 'AUAP' THEN 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=200&fit=crop'
        ELSE logo_url
    END
WHERE name IN ('UGC', 'AICTE', 'NAAC', 'NBA', 'WES', 'AIU', 'IACBE', 'ACBSP', 'PCI', 'BCI', 'NIRF', 'QS', 'AUAP');

-- Alternative: Use placeholder service with custom text
-- Uncomment this if you want to use placeholder images with accreditation names
/*
UPDATE accreditations SET 
    logo_url = 'https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=' || name
WHERE logo_url IS NULL OR logo_url = '';
*/

-- Alternative: Use UI Avatars service for text-based logos
UPDATE accreditations SET 
    logo_url = 'https://ui-avatars.com/api/?name=' || REPLACE(name, ' ', '+') || '&size=200&background=4F46E5&color=fff&bold=true'
WHERE logo_url IS NULL OR logo_url = '' OR logo_url LIKE '%example.com%';

-- Show results
SELECT 'Accreditations with updated logos:' as info;
SELECT 
    id, 
    name, 
    full_name,
    LEFT(logo_url, 50) || '...' as logo_url_preview,
    CASE 
        WHEN logo_url IS NOT NULL AND logo_url != '' THEN '✓ Has Logo'
        ELSE '✗ No Logo'
    END as status
FROM accreditations
ORDER BY display_order;

-- Test query to see how they'll look
SELECT 'Preview of accreditation data:' as info;
SELECT 
    name,
    full_name,
    logo_url
FROM accreditations
WHERE is_active = true
ORDER BY display_order
LIMIT 5;