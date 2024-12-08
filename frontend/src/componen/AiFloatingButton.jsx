import { useEffect } from 'react';

const AIFloatingButton = () => {

  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "4ff25263-dbed-49fd-b8d6-05de68dbddfd",
      region: "us-south",
      serviceInstanceID: "16c0cf61-5c1e-41c3-aec1-0bbdebc44749",
      onLoad: (instance) => {
        instance.render();
        const defaultButton = document.querySelector('.watson-chat-launcher');
        if (defaultButton) {
          defaultButton.style.display = 'block';
          defaultButton.style.position = 'fixed';
          defaultButton.style.bottom = '32px';
          defaultButton.style.right = '32px';
          defaultButton.style.zIndex = '9999';
        }
      },
    };


    const script = document.createElement('script');
    script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/${window.watsonAssistantChatOptions.clientVersion || 'latest'
      }/WatsonAssistantChatEntry.js`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default AIFloatingButton;
