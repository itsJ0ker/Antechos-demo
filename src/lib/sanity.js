const SANITY_PROJECT_ID = "mnv60h0l";
const SANITY_DATASET = "production";
const SANITY_TOKEN = "skJObdOheDZCV0DCx364eJIf6XEzSrmZM0lMQtWiNUfT6UmySXrdMRp9tipzUnK53FVnd2VPhPIiCl1QisXe0RhsfDC3KBdpvjU25KNh8jsgbryWfcLnvjHaXdUlc7n607nZnLAoHHxtrDCnPxo1V3q8he37Wmobpga6GWTP8zDs0m031k3M";

const MOCK_BLOGS = [
  {
    _id: "mock-1",
    _type: "post",
    title: "Navigating Online MBA: RoI, Placements, and Executive Growth",
    slug: { current: "navigating-online-mba-roi-placements-growth" },
    excerpt: "Discover how a modern online MBA compares to traditional executive programs, detailing real placement statistics and corporate recognition.",
    body: `### The Rise of Online MBA in Corporate India

In recent years, the landscape of higher education has shifted dramatically. Online MBAs, once viewed with skepticism, have emerged as a powerful alternative for working professionals who wish to accelerate their careers without leaving their current roles. 

#### Understanding the RoI (Return on Investment)

When evaluating any educational program, the primary question is always: *Is it worth the investment?*
For an online MBA, the calculation is highly favorable. While a top-tier physical MBA can cost upwards of ₹20-30 Lakhs, a premium online MBA from a UGC-DEB approved university ranges between ₹1.5 to ₹4 Lakhs. 

- **Direct Cost Savings:** No travel, no hostel fees, and no lost income.
- **Immediate Skill Application:** Apply framework and strategy lessons directly to your daily tasks.
- **Payback Period:** Most online MBA graduates report full recovery of their tuition fees within 12 to 18 months of graduation through promotions or strategic job switches.

#### Placement Opportunities and Industry Recognition

A common myth is that online degrees do not offer placement support. Today, leading platforms and partner universities provide:
1. **Virtual Job Fairs:** Dedicated recruitment drives with 150+ corporate partners.
2. **Resume Engineering:** AI-driven tools and consultant feedback to align resumes with top recruiters.
3. **Mock Interviews:** Executive coaching by industry veterans.

The corporate world has matured. Employers like TCS, Wipro, Amazon, and Accenture actively hire online MBA graduates, prioritizing skills, agility, and the dedication required to balance work and studies.
`,
    category: "Higher Education",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    authorName: "Ananya Verma",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    publishedAt: "2026-07-01T10:00:00.000Z"
  },
  {
    _id: "mock-2",
    _type: "post",
    title: "Demystifying GenAI and Agentic AI: The Skills Recruiters Demand",
    slug: { current: "demystifying-genai-and-agentic-ai" },
    excerpt: "An in-depth look at how generative and agentic artificial intelligence are reshaping the tech workforce and how to upskill effectively.",
    body: `### The Evolution from Generative AI to Agentic AI

We have officially moved past the phase where writing basic prompts in ChatGPT is considered a unique skill. Recruiters are now searching for professionals who understand **Agentic AI**—systems capable of autonomous planning, tool utilization, and self-correction.

#### Why Agentic AI Matters

Generative AI generates content based on instructions. Agentic AI, on the other hand, acts as a digital worker. It can:
- **Execute Complex Workflows:** Break down a goal into discrete tasks.
- **Interact with External Tools:** Query databases, write files, run tests, and browse the web.
- **Learn and Correct:** Adjust behavior based on environment feedback.

#### Essential Skills for the Modern Developer

To stay competitive in the market, developers must master these frameworks and concepts:
1. **Orchestration Libraries:** LangChain, LangGraph, and AutoGen.
2. **Vector Databases:** Milvus, Pinecone, and Qdrant for Retrieval-Augmented Generation (RAG).
3. **Agentic Workflows:** Iterative refinement, code generation, and multi-agent collaboration.

#### Career Pathways and Salaries

Salaries for engineers specializing in Agentic AI have skyrocketed, with average premiums of 40% to 60% higher than traditional software engineers. Building a robust portfolio of open-source agent projects is the fastest way to get noticed by recruiters.
`,
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&q=80",
    authorName: "Shivam Jha",
    authorImage: "https://i.ibb.co/S7s5ncHK/image.png",
    publishedAt: "2026-07-05T14:30:00.000Z"
  },
  {
    _id: "mock-3",
    _type: "post",
    title: "Career Transition Secrets for Non-Tech Professionals",
    slug: { current: "career-transition-secrets-non-tech" },
    excerpt: "How to pivot into high-paying technology roles from non-technical backgrounds without starting your career from scratch.",
    body: `### The Pivot: Tech is Not Just for Coders

Many professionals in sales, operations, human resources, or hospitality feel trapped, believing that the high-paying tech industry is closed to them unless they learn complex software programming. This is far from the truth.

#### High-Demand Non-Coding Tech Roles

The tech ecosystem requires a diverse set of skills. Some of the fastest-growing non-coding roles include:
- **Product Managers:** The bridge between business goals and technical execution.
- **Scrum Masters & Agile Coaches:** Facilitators who ensure engineering teams deliver value smoothly.
- **Data Analysts:** Translating numbers into actionable business insights.
- **UI/UX Researchers:** Understanding user behavior to shape design decisions.

#### The Bridge: Specializations and Hybrid Learning

Making a transition requires a strategic blueprint:
1. **Leverage Domain Knowledge:** If you worked in finance, pivot to FinTech. Your industry knowledge is invaluable to developers.
2. **Targeted Certifications:** Acquire recognized credentials (like Executive PGPs or professional certifications).
3. **Hands-on Capstones:** Work on real-world projects that simulate standard team workflows.

A career pivot is about translation—redefining your soft skills (leadership, communication, problem-solving) in a tech context while proving you understand tech terminology.
`,
    category: "Career Advice",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    authorName: "Pawan Kumar",
    authorImage: "https://i.ibb.co/BHjmfn0W/image.png",
    publishedAt: "2026-07-07T08:15:00.000Z"
  }
];

// Read from Local Storage
export const getLocalStoragePosts = () => {
  try {
    const posts = localStorage.getItem("antechos_local_blogs");
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error("Error reading local storage blogs:", error);
    return [];
  }
};

// Write to Local Storage
export const saveLocalStoragePost = (post) => {
  try {
    const localPosts = getLocalStoragePosts();
    // Add to top of list
    const updated = [post, ...localPosts];
    localStorage.setItem("antechos_local_blogs", JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error("Error saving blog to local storage:", error);
    return false;
  }
};

// Fetch Posts (Sanity + LocalStorage + Mock fallback)
export const fetchPosts = async () => {
  const localPosts = getLocalStoragePosts();
  let sanityPosts = [];

  const deletedMocks = JSON.parse(localStorage.getItem("antechos_deleted_mocks") || "[]");
  const deletedSanity = JSON.parse(localStorage.getItem("antechos_deleted_sanity") || "[]");
  const deletedIds = new Set([...deletedMocks, ...deletedSanity]);

  try {
    const query = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc)`);
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${SANITY_DATASET}?query=${query}`;
    
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.result && Array.isArray(data.result)) {
        sanityPosts = data.result;
      }
    } else {
      console.warn("Sanity fetch failed. Using fallbacks.");
    }
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
  }

  // Filter out any locally deleted sanity posts
  const activeSanity = sanityPosts.filter(p => !deletedIds.has(p._id));
  
  // Combine Sanity posts and localStorage posts
  const combined = [...localPosts, ...activeSanity];

  // If no posts anywhere, return the pre-styled mock blogs (excluding deleted ones)
  const activeMocks = MOCK_BLOGS.filter(p => !deletedIds.has(p._id));
  if (combined.length === 0) {
    return activeMocks;
  }

  // Sort combined posts by publishedAt desc
  return combined
    .filter(p => !deletedIds.has(p._id))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

// Create a Blog Post
export const createPost = async (postData) => {
  const newId = `post-${Date.now()}`;
  const slugCurrent = postData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const fullPost = {
    _id: newId,
    _type: "post",
    title: postData.title,
    slug: {
      _type: "slug",
      current: slugCurrent || `blog-${Date.now()}`
    },
    excerpt: postData.excerpt || "",
    body: postData.body || "",
    category: postData.category || "General",
    coverImage: postData.coverImage || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    authorName: postData.authorName || "Anonymous Editor",
    authorImage: postData.authorImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    publishedAt: new Date().toISOString()
  };

  const mutations = [
    {
      create: fullPost
    }
  ];

  try {
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${SANITY_DATASET}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SANITY_TOKEN}`
      },
      body: JSON.stringify({ mutations })
    });

    const data = await response.json();
    if (response.ok && !data.error) {
      console.log("Post successfully created in Sanity:", data);
      return { success: true, method: "sanity", post: fullPost };
    } else {
      console.warn("Sanity mutation error:", data.error || data);
      // Save locally as fallback
      saveLocalStoragePost(fullPost);
      return { 
        success: true, 
        method: "local", 
        post: fullPost, 
        errorDetails: data.error?.description || "Insufficient permissions on token"
      };
    }
  } catch (error) {
    console.error("Sanity connection error. Saving locally:", error);
    saveLocalStoragePost(fullPost);
    return { success: true, method: "local", post: fullPost, errorDetails: error.message };
  }
};

// Update a Blog Post
export const updatePost = async (id, postData) => {
  const isLocal = id.startsWith("post-") || id.startsWith("mock-");
  
  const updatedPost = {
    _id: id,
    _type: "post",
    title: postData.title,
    slug: postData.slug || {
      _type: "slug",
      current: postData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    },
    excerpt: postData.excerpt || "",
    body: postData.body || "",
    category: postData.category || "General",
    coverImage: postData.coverImage,
    authorName: postData.authorName,
    authorImage: postData.authorImage,
    publishedAt: postData.publishedAt || new Date().toISOString()
  };

  if (isLocal) {
    try {
      const localPosts = getLocalStoragePosts();
      const updated = localPosts.map(p => p._id === id ? updatedPost : p);
      const foundInLocal = localPosts.some(p => p._id === id);
      const finalPosts = foundInLocal ? updated : [updatedPost, ...localPosts];
      localStorage.setItem("antechos_local_blogs", JSON.stringify(finalPosts));
      return { success: true, method: "local", post: updatedPost };
    } catch (e) {
      return { success: false, errorDetails: e.message };
    }
  }

  // Attempt Sanity edit
  const mutations = [
    {
      createOrReplace: updatedPost
    }
  ];

  try {
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${SANITY_DATASET}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SANITY_TOKEN}`
      },
      body: JSON.stringify({ mutations })
    });
    const data = await response.json();
    if (response.ok && !data.error) {
      return { success: true, method: "sanity", post: updatedPost };
    } else {
      // Fallback: save update locally
      const localPosts = getLocalStoragePosts();
      const updated = localPosts.filter(p => p._id !== id);
      localStorage.setItem("antechos_local_blogs", JSON.stringify([updatedPost, ...updated]));
      return { 
        success: true, 
        method: "local", 
        post: updatedPost, 
        errorDetails: data.error?.description || "Sanity token restricted. Saved locally."
      };
    }
  } catch (err) {
    // Fallback: save update locally
    const localPosts = getLocalStoragePosts();
    const updated = localPosts.filter(p => p._id !== id);
    localStorage.setItem("antechos_local_blogs", JSON.stringify([updatedPost, ...updated]));
    return { success: true, method: "local", post: updatedPost, errorDetails: err.message };
  }
};

// Delete a Blog Post
export const deletePost = async (id) => {
  const isLocal = id.startsWith("post-") || id.startsWith("mock-");

  if (isLocal) {
    try {
      const localPosts = getLocalStoragePosts();
      const filtered = localPosts.filter(p => p._id !== id);
      localStorage.setItem("antechos_local_blogs", JSON.stringify(filtered));
      
      if (id.startsWith("mock-")) {
        const deletedMocks = JSON.parse(localStorage.getItem("antechos_deleted_mocks") || "[]");
        localStorage.setItem("antechos_deleted_mocks", JSON.stringify([...deletedMocks, id]));
      }
      return { success: true };
    } catch (e) {
      return { success: false, errorDetails: e.message };
    }
  }

  // Attempt Sanity delete
  const mutations = [
    {
      delete: { id }
    }
  ];

  try {
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${SANITY_DATASET}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SANITY_TOKEN}`
      },
      body: JSON.stringify({ mutations })
    });
    const data = await response.json();
    if (response.ok && !data.error) {
      return { success: true };
    } else {
      // If it fails on Sanity, register it as locally deleted if it's a Sanity post
      const deletedSanity = JSON.parse(localStorage.getItem("antechos_deleted_sanity") || "[]");
      localStorage.setItem("antechos_deleted_sanity", JSON.stringify([...deletedSanity, id]));
      return { success: true, warning: "Local only delete due to write permissions." };
    }
  } catch (err) {
    const deletedSanity = JSON.parse(localStorage.getItem("antechos_deleted_sanity") || "[]");
    localStorage.setItem("antechos_deleted_sanity", JSON.stringify([...deletedSanity, id]));
    return { success: true, warning: "Local only delete due to network issues." };
  }
};
