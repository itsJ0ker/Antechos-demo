// Utility for handling image fallbacks without external dependencies

/**
 * Generate a data URI for a placeholder image with text
 * @param {string} text - Text to display in the placeholder
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @param {string} bgColor - Background color (hex without #)
 * @param {string} textColor - Text color (hex without #)
 * @returns {string} Data URI for the SVG image
 */
export const generatePlaceholder = (text = '?', width = 400, height = 300, bgColor = '6366f1', textColor = 'ffffff') => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="#${textColor}" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;
  // Use encodeURIComponent instead of btoa to handle emojis and special characters
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/**
 * Get a placeholder for course images
 */
export const getCoursePlaceholder = () => generatePlaceholder('📚', 400, 300);

/**
 * Get a placeholder for profile images
 */
export const getProfilePlaceholder = (initial = 'U') => generatePlaceholder(initial, 40, 40);

/**
 * Get a placeholder for trainer images
 */
export const getTrainerPlaceholder = () => generatePlaceholder('👤', 40, 40);

/**
 * Get a placeholder for testimonial images
 */
export const getTestimonialPlaceholder = () => generatePlaceholder('💬', 40, 40);

/**
 * Get a placeholder for workforce images
 */
export const getWorkforcePlaceholder = () => generatePlaceholder('👷', 40, 40);
