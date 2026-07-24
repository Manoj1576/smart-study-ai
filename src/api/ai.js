export const getApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${cleanBase}${cleanEndpoint}`;
};

export const simulateAI = async (prompt, type = 'general', context = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let response;
      if (type === 'analyze_material') {
         response = {
           time: "3.5 hours",
           concepts: ["Core fundamentals", "Advanced formulations", "System structure", "Review questions"],
           links: [
             { title: `YouTube: Top ${prompt} Tutorials`, url: `https://youtube.com/results?search_query=${encodeURIComponent(prompt)}` },
             { title: `Google: Deep Dive ${prompt}`, url: `https://google.com/search?q=${encodeURIComponent(prompt)}` }
           ]
         };
      } else if (type === 'analyze_difficulty') {
         const hours = context === 'Hard' ? '4.5 hours' : context === 'Medium' ? '2.5 hours' : '1.5 hours';
         response = {
           time: hours,
           concepts: ["Basic overview", "Example solving", "Practice session"],
           links: [
             { title: `YouTube: Easy Guide to ${prompt}`, url: `https://youtube.com/results?search_query=${encodeURIComponent("Learn " + prompt)}` },
             { title: `Google: Study Notes ${prompt}`, url: `https://google.com/search?q=${encodeURIComponent("Study " + prompt)}` }
           ]
         };
      } else if (type === 'chat') {
         response = `AI Explanation for "${prompt}":\n\n1. Concept Definition: The primary logic revolves around isolating variables.\n2. Example: Identify constants X and Y.\n3. Solution Path: Substitute knowns into the foundational theorem.\n\nHope this step-by-step breakdown clarifies the problem!`;
      } else if (type === 'translate_tamil') {
         response = `Tamil Translation: இது "${prompt}" என்பதன் மொழிபெயர்ப்பு.`;
      } else if (type === 'translate_english') {
         response = `English Translation: ${prompt} - The statement has been translated successfully.`;
      }
      resolve(response);
    }, 1500); // 1.5s delay to simulate network latency
  });
};

