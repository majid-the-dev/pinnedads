import getCurrentInfluencer from '@/actions/get-current-influencer';

const Settings = async () => {

  const currentUser = await getCurrentInfluencer();

  return (
    <div>Settings</div>
  )
}

export default Settings