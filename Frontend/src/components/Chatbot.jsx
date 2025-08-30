import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // 💡 Prevent duplicate script injection
    if (document.getElementById('botpress-webchat-script')) {
      return;
    }

    const injectScript1 = document.createElement('script');
    injectScript1.id = 'botpress-webchat-script'; // Add an ID to the first script
    injectScript1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    injectScript1.async = true;
    
    // ✅ This is the key change:
    // We wait for the first script to load completely before adding the second one.
    injectScript1.onload = () => {
      const injectScript2 = document.createElement('script');
      injectScript2.src = "https://files.bpcontent.cloud/2024/11/25/16/20241125165355-LZD6BEFE.js";
      injectScript2.async = true;
      document.body.appendChild(injectScript2);
    };

    document.body.appendChild(injectScript1);

  }, []);

  return null;
};

export default Chatbot;