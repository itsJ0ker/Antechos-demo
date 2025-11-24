/**
 * Cleanup Script - Identifies potentially unused files
 * Run with: node cleanup-unused.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Scanning for potentially unused files...\n');

// Files that appear to be unused based on analysis
const potentiallyUnused = {
  components: [
    'src/components/admin/AdminDebug.jsx',
    'src/components/admin/UniversityManager.jsx',
  ],
  pages: [
    'src/pages/Courses.jsx',
    'src/pages/MarketplaceNew.jsx',
  ],
  data: [
    'src/data/universityData.js',
    'src/data/dataservice.js',
    'src/data/workforcedata.js',
  ]
};

let foundFiles = [];
let missingFiles = [];

// Check which files exist
Object.keys(potentiallyUnused).forEach(category => {
  console.log(`\n📁 ${category.toUpperCase()}:`);
  potentiallyUnused[category].forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`  ⚠️  ${file} - EXISTS (potentially unused)`);
      foundFiles.push(file);
    } else {
      console.log(`  ✅ ${file} - Already removed`);
      missingFiles.push(file);
    }
  });
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`  - Potentially unused files found: ${foundFiles.length}`);
console.log(`  - Already removed: ${missingFiles.length}`);

if (foundFiles.length > 0) {
  console.log('\n⚠️  WARNING: Review these files before deletion!');
  console.log('   They may be used in ways not detected by simple grep searches.');
  console.log('\n💡 To remove them, run:');
  foundFiles.forEach(file => {
    console.log(`   del "${file}"`);
  });
}

console.log('\n✅ Cleanup scan complete!\n');
