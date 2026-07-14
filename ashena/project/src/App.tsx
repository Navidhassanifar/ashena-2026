import { useRouter } from './lib/router';
import { Header, BottomNav } from './components/Navigation';
import { PreLaunchBanner } from './components/PreLaunchBanner';
import { HomePage } from './pages/HomePage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { SearchPage } from './pages/SearchPage';
import { WaitlistResultsPage } from './pages/WaitlistResultsPage';

export default function App() {
  const { route } = useRouter();

  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <PreLaunchBanner />
      <Header route={route} />
      {route.name === 'home' && <HomePage />}
      {route.name === 'story' && route.id && <StoryDetailPage storyId={route.id} />}
      {route.name === 'search' && <SearchPage />}
      {route.name === 'waitlist-results' && <WaitlistResultsPage />}
      <BottomNav route={route} />
    </div>
  );
}
