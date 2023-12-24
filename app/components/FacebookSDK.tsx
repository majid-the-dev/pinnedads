// components/FacebookSDK.tsx

import { useEffect } from 'react';

const FacebookSDK: React.FC = () => {
  useEffect(() => {
    if (!window?.FB) return;

    window.fbAsyncInit = function () {
      window.FB?.init({
        appId: '{your-app-id}',
        version: '{api-version}'
      });

      window.FB?.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s) as HTMLScriptElement; // Type assertion here

      if (fjs && fjs.parentNode) { // Null check here
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'facebook-jssdk'));

  }, []);

  return null;
};

export default FacebookSDK;
