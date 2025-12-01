import React, { useState, useEffect } from 'react';
import { User, BuddyProfile, SportType, Area, Message, GamePost } from './types';
import { generateGamePosts } from './services/geminiService';
import GameFeed from './components/GameFeed';
import ProfilePage from './pages/ProfilePage';
import ChatRoom from './components/ChatRoom';
import CreatePostModal from './components/CreatePostModal';
import ParticlesBackground from './components/ParticlesBackground';
import GreenFalconsLogo from './components/GreenFalconsLogo';
import { SearchIcon, UserIcon, MessageCircleIcon, ActivityIcon, PlusIcon } from './components/Icons';

// --- Bottom Navigation ---

const BottomNav = ({ activeTab, setTab }: { activeTab: string, setTab: (t: string) => void }) => {
  return (
    <div className="fixed bottom-6 left-6 right-6 h-[70px] glass-card rounded-full flex justify-around items-center z-40 shadow-2xl border border-white/10">
      <button 
        onClick={() => setTab('feed')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${activeTab === 'feed' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40' : 'text-gray-400 hover:text-white'}`}
      >
        <SearchIcon className="w-5 h-5" />
      </button>
      
      <button 
        onClick={() => setTab('my_games')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${activeTab === 'my_games' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40' : 'text-gray-400 hover:text-white'}`}
      >
        <MessageCircleIcon className="w-5 h-5" />
      </button>

      <button 
        onClick={() => setTab('profile')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${activeTab === 'profile' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40' : 'text-gray-400 hover:text-white'}`}
      >
        <UserIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

// --- Pages ---

const SignupPage = ({ onComplete }: { onComplete: (u: User) => void }) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState<Area>(Area.OLAYA);
  const [age, setAge] = useState('');
  const [selectedSports, setSelectedSports] = useState<SportType[]>([]);

  const toggleSport = (sport: SportType) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(prev => prev.filter(s => s !== sport));
    } else {
      setSelectedSports(prev => [...prev, sport]);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age && selectedSports.length > 0) {
      onComplete({
        id: 'current_user',
        name,
        age,
        area,
        favoriteSports: selectedSports,
        avatarUrl: 'https://ui-avatars.com/api/?name=' + name + '&background=random'
      });
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 relative z-10 overflow-y-auto">
      <div className="w-full max-w-md glass-card rounded-[40px] p-8 animate-in zoom-in-95 duration-500 mb-6">
        
        <div className="flex flex-col items-center mb-8">
          <div className="h-20 w-20 bg-gradient-to-tr from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-brand-500/30 animate-float">
            <ActivityIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-200 text-center">Join SportBuddy</h1>
          <p className="text-brand-200/80 text-sm mt-1 text-center">Find games. Make friends.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-200 uppercase tracking-wider ml-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full p-4 glass-input rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder-gray-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
             <label className="text-xs font-bold text-brand-200 uppercase tracking-wider ml-1">Age</label>
             <input 
              type="number"
              required
              className="w-full p-4 glass-input rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder-gray-500"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-200 uppercase tracking-wider ml-1">Neighborhood</label>
            <div className="relative">
              <select 
                className="w-full p-4 glass-input rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-white"
                value={area}
                onChange={(e) => setArea(e.target.value as Area)}
              >
                {Object.values(Area).map(a => (
                  <option key={a} value={a} className="bg-slate-800 text-white">{a}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-brand-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-200 uppercase tracking-wider ml-1">Preferred Sports</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(SportType).map(sport => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => toggleSport(sport)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    selectedSports.includes(sport)
                    ? 'bg-brand-500 border-brand-400 text-white shadow-lg shadow-brand-500/30'
                    : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 mt-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </button>
        </form>
      </div>

      {/* Green Falcons Credit */}
      <div className="flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 pb-8">
         <p className="text-[9px] font-bold text-brand-300 uppercase tracking-[0.2em] mb-2">Designed by</p>
         <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
            <GreenFalconsLogo className="w-8 h-8" />
            <span className="text-xs font-bold text-white tracking-wide">Green Falcons</span>
         </div>
      </div>
    </div>
  );
};

const MyGamesPage = ({ 
  joinedPosts,
  currentUser,
  onOpenChat 
}: { 
  joinedPosts: GamePost[], 
  currentUser: User,
  onOpenChat: (buddy: BuddyProfile) => void
}) => {
  return (
    <div className="h-full pt-safe pb-28 px-6 overflow-y-auto no-scrollbar relative z-10">
      <h2 className="text-3xl font-bold text-white mt-8 mb-6 drop-shadow-md">My Games</h2>
      
      {joinedPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <div className="glass-card rounded-full p-6 mb-4 text-brand-300 animate-float">
             <ActivityIcon className="w-8 h-8" />
          </div>
          <p className="text-gray-300 font-medium text-lg">No upcoming games</p>
          <p className="text-gray-500 text-sm mt-2 max-w-[200px]">Join a game from the feed to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {joinedPosts.map(post => {
            // Convert post author to a "buddy" for chat purposes
            const buddyProfile: BuddyProfile = {
                id: post.author.id,
                name: post.author.name,
                age: 25, // Placeholder
                sport: post.sport,
                area: post.area,
                bio: post.content,
                level: 'Intermediate',
                availability: post.time,
                availableDays: [],
                avatarUrl: post.author.avatarUrl,
                rating: post.author.rating,
                reviewCount: 10,
                matchPercentage: 100
            };

            return (
            <div key={post.id} className="glass-card p-4 rounded-3xl transition-transform hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 bg-brand-500/20 text-brand-300 text-[10px] font-bold uppercase rounded-md">
                      {post.sport}
                  </span>
                  <span className="text-xs text-gray-400">{post.time}</span>
              </div>
              
              <p className="font-bold text-white text-lg mb-1">{post.area} Game</p>
              <div className="flex items-center text-sm text-gray-400 mb-3">
                  <span className="mr-2">Host: {post.author.name}</span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => onOpenChat(buddyProfile)}
                  className="flex-1 py-2 rounded-xl bg-brand-500 text-white text-sm font-bold flex items-center justify-center hover:bg-brand-400 transition shadow-lg shadow-brand-500/20"
                >
                  <MessageCircleIcon className="w-4 h-4 mr-2" />
                  Chat
                </button>
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('feed');
  
  // Data State
  const [posts, setPosts] = useState<GamePost[]>([]);
  const [joinedPosts, setJoinedPosts] = useState<GamePost[]>([]);
  const [chatHistory, setChatHistory] = useState<Record<string, Message[]>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Chat UI State
  const [activeChatBuddy, setActiveChatBuddy] = useState<BuddyProfile | null>(null);

  // Initial Load
  useEffect(() => {
    const loadInitialPosts = async () => {
        const initialPosts = await generateGamePosts();
        setPosts(initialPosts);
    };
    loadInitialPosts();
  }, []);

  const handleJoinGame = (post: GamePost) => {
    // Optimistic update
    const updatedPost = {
        ...post,
        attendees: [...post.attendees, user?.id || 'temp']
    };
    
    setPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p));
    setJoinedPosts(prev => [...prev, updatedPost]);
  };

  const handleCreatePost = (newPost: GamePost) => {
      setPosts(prev => [newPost, ...prev]);
      setJoinedPosts(prev => [newPost, ...prev]); // Auto join own post
      setShowCreateModal(false);
  };

  const handleSendMessage = (buddyId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text,
      timestamp: Date.now(),
      isUser: true
    };
    
    setChatHistory(prev => ({
      ...prev,
      [buddyId]: [...(prev[buddyId] || []), newMessage]
    }));
  };

  const handleReceiveReply = (buddyId: string, text: string) => {
    const replyMessage: Message = {
      id: (Date.now() + 1).toString(),
      senderId: buddyId,
      text,
      timestamp: Date.now(),
      isUser: false
    };

    setChatHistory(prev => ({
      ...prev,
      [buddyId]: [...(prev[buddyId] || []), replyMessage]
    }));
  };

  return (
    <div className="h-full w-full flex flex-col text-white relative">
      <ParticlesBackground />

      {!user ? (
        <SignupPage onComplete={setUser} />
      ) : activeChatBuddy ? (
         <ChatRoom 
           buddy={activeChatBuddy}
           messages={chatHistory[activeChatBuddy.id] || []}
           onBack={() => setActiveChatBuddy(null)}
           onSendMessage={(text) => handleSendMessage(activeChatBuddy.id, text)}
           onReceiveReply={(text) => handleReceiveReply(activeChatBuddy.id, text)}
         />
      ) : (
        <>
          {/* Main Content Area */}
          <div className="flex-1 relative z-10 h-full overflow-hidden flex flex-col">
            
            {/* Header Area (Visible on Feed) */}
            {activeTab === 'feed' && (
                <div className="pt-safe px-6 pb-2 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Feed</h1>
                        <p className="text-brand-200 text-sm">Live games in Riyadh</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-brand-500/30">
                        {user.name.charAt(0)}
                    </div>
                </div>
            )}

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {activeTab === 'feed' && (
                    <GameFeed 
                        posts={posts} 
                        currentUser={user} 
                        onJoin={handleJoinGame} 
                    />
                )}

                {activeTab === 'my_games' && (
                    <MyGamesPage 
                        joinedPosts={joinedPosts} 
                        currentUser={user}
                        onOpenChat={setActiveChatBuddy}
                    />
                )}

                {activeTab === 'profile' && (
                    <ProfilePage user={user} onLogout={() => setUser(null)} />
                )}
            </div>
          </div>
          
          {/* Create Post FAB (Only on feed) */}
          {activeTab === 'feed' && (
              <button 
                onClick={() => setShowCreateModal(true)}
                className="fixed bottom-28 right-6 w-14 h-14 bg-brand-500 rounded-full flex items-center justify-center shadow-2xl shadow-brand-500/50 z-40 hover:scale-105 transition-transform active:scale-95"
              >
                  <PlusIcon className="w-8 h-8 text-white" />
              </button>
          )}

          {/* Create Modal */}
          {showCreateModal && (
              <CreatePostModal 
                user={user} 
                onClose={() => setShowCreateModal(false)} 
                onSubmit={handleCreatePost} 
              />
          )}

          <BottomNav activeTab={activeTab} setTab={setActiveTab} />
        </>
      )}
    </div>
  );
}