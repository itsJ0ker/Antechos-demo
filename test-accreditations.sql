-- Test script to check accreditation data
-- Run this in Supabase SQL Editor to debug the issue

-- 1. Check if accreditations table has data
SELECT 'Accreditations in database:' as info;
SELECT id, name, full_name, is_active FROM accreditations ORDER BY display_order;

-- 2. Check if universities table has data
SELECT 'Universities in database:' as info;
SELECT id, name, location, is_active FROM universities LIMIT 5;

-- 3. Check university_accreditations junction table
SELECT 'University-Accreditation relationships:' as info;
SELECT 
    ua.id,
    ua.university_id,
    u.name as university_name,
    ua.accreditation_id,
    a.name as accreditation_name,
    ua.display_order
FROM university_accreditations ua
JOIN universities u ON ua.university_id = u.id
JOIN accreditations a ON ua.accreditation_id = a.id
ORDER BY ua.university_id, ua.display_order;

-- 4. Test the exact query used by the frontend
SELECT 'Testing frontend query for university ID 1:' as info;
SELECT 
    u.*,
    json_agg(
        json_build_object(
            'id', ua.id,
            'display_order', ua.display_order,
            'accreditation', json_build_object(
                'id', a.id,
                'name', a.name,
                'full_name', a.full_name,
                'logo_url', a.logo_url,
                'description', a.description
            )
        )
    ) FILTER (WHERE ua.id IS NOT NULL) as university_accreditations
FROM universities u
LEFT JOIN university_accreditations ua ON u.id = ua.university_id
LEFT JOIN accreditations a ON ua.accreditation_id = a.id
WHERE u.id = 1 AND u.is_active = true
GROUP BY u.id;

-- 5. If no data, let's add some test data
INSERT INTO university_accreditations (university_id, accreditation_id, display_order)
SELECT 1, a.id, a.display_order
FROM accreditations a
WHERE a.name IN ('UGC', 'AICTE', 'NAAC')
AND NOT EXISTS (
    SELECT 1 FROM university_accreditations ua 
    WHERE ua.university_id = 1 AND ua.accreditation_id = a.id
)
AND EXISTS (SELECT 1 FROM universities WHERE id = 1);

-- 6. Final check
SELECT 'Final check - University 1 accreditations:' as info;
SELECT 
    u.name as university_name,
    a.name as accreditation_name,
    a.full_name,
    ua.display_order
FROM universities u
JOIN university_accreditations ua ON u.id = ua.university_id
JOIN accreditations a ON ua.accreditation_id = a.id
WHERE u.id = 1
ORDER BY ua.display_order;