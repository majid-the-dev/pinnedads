declare global {
    interface Window {
      FB?: {
        init: (config: { appId: string, version: string }) => void;
        AppEvents: {
          logPageView: () => void;
        };
      };
      fbAsyncInit?: () => void; // Add this line to include fbAsyncInit property
    }
  }
  
  export {};