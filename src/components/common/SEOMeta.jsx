import { useEffect } from "react";

const SEOMeta = ({ 
  title, 
  description, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  schema 
}) => {
  useEffect(() => {
    // 1. Update document title
    if (title) {
      document.title = `${title} | Antechos India`;
    }

    // 2. Helper to find/create/update meta tags
    const updateMetaTag = (attrName, attrValue, contentValue) => {
      if (!contentValue) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // Update primary description
    updateMetaTag("name", "description", description);
    
    // Update Open Graph tags
    updateMetaTag("property", "og:title", ogTitle || title);
    updateMetaTag("property", "og:description", ogDescription || description);
    updateMetaTag("property", "og:image", ogImage || "https://antechosindia.com/premium_education_hero_1778405676093.png");
    
    // Update Twitter Card tags
    updateMetaTag("property", "twitter:title", ogTitle || title);
    updateMetaTag("property", "twitter:description", ogDescription || description);
    updateMetaTag("property", "twitter:image", ogImage || "https://antechosindia.com/premium_education_hero_1778405676093.png");

    // 3. Inject / Update JSON-LD Schema (GEO / AEO)
    let scriptElement = document.getElementById("jsonld-schema-page");
    
    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = "jsonld-schema-page";
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.text = JSON.stringify(schema);
    } else {
      // If no page-specific schema, clear any old ones
      if (scriptElement) {
        scriptElement.remove();
      }
    }

    // Cleanup: we don't necessarily want to remove standard page descriptions on unmount,
    // but clearing the custom script element is good practice
    return () => {
      const scriptToRemove = document.getElementById("jsonld-schema-page");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, ogTitle, ogDescription, ogImage, schema]);

  return null;
};

export default SEOMeta;
