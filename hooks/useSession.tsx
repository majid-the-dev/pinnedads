// hooks/useSession.ts

import { useEffect } from 'react';
import { getSession, useSession as useNextAuthSession } from 'next-auth/react';

interface UseSessionResult {
  session: any; // Replace 'any' with your actual session type
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const usSession = (): UseSessionResult => {
  const { data: session, status } = useNextAuthSession();

  

  useEffect(() => {
    const fetchSession = async () => {
      const fetchedSession = await getSession();
      if (fetchedSession) {
        // You can do additional logic with the session if needed
        // console.log('User session:', fetchedSession);
      }
    };

    if (status === 'authenticated') {
      fetchSession();
    }
  }, [status]);

  return { session, status };
};

export default usSession;
