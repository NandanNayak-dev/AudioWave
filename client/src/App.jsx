import { Suspense, lazy, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import queryClient from './utils/queryClient'
import Loading from './utils/Loading'
import Playlists from './components/dashboard/routeTypes/Playlists'
const LikedSongs = lazy(
  () => import('./components/dashboard/routeTypes/LikedSongs')
)
const Discography = lazy(
  () => import('./components/dashboard/routeTypes/components/Discography')
)
const Playlist = lazy(
  () => import('./components/dashboard/routeTypes/Playlist')
)
const Artist = lazy(() => import('./components/dashboard/routeTypes/Artist'))
const Track = lazy(() => import('./components/dashboard/routeTypes/Track'))
const Album = lazy(() => import('./components/dashboard/routeTypes/Album'))
const Search = lazy(() => import('./components/dashboard/searchMenu/Search'))
const RecentlyPlayed = lazy(
  () => import('./components/dashboard/routeTypes/RecentlyPlayed')
)
const Landing = lazy(() => import('./pages/Landing'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Authentication = lazy(() => import('./pages/Authentication'))
const Public = lazy(() => import('./pages/Public'))
const Developer = lazy(() => import('./pages/Developer'))
const API = lazy(() => import('./components/developer/API'))
const Playground = lazy(() => import('./components/developer/Playground'))
const Docs = lazy(() => import('./components/developer/Docs'))
const Settings = lazy(() => import('./components/developer/Settings'))

const ErrorBoundary = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-400 mb-8">This usually happens during a hot-reload or temporary network glitch.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-green-500 text-black font-semibold rounded-full hover:bg-green-400"
      >
        Refresh Page
      </button>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/auth',
    element: <Authentication />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'playlist/:id',
        element: <Playlist />,
      },
      {
        path: 'artist/:id',
        element: <Artist />,
      },
      {
        path: 'artist/:id/discography',
        element: <Discography />,
      },
      {
        path: 'track/:id',
        element: <Track />,
      },
      {
        path: 'album/:id',
        element: <Album />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'search/:query',
        element: <Search />,
      },
      {
        path: 'recently-played',
        element: <RecentlyPlayed />,
      },
      {
        path: 'liked',
        element: <LikedSongs />,
      },
      {
        path: 'playlists',
        element: <Playlists />,
      },
    ],
  },
  {
    path: '/developer',
    element: <Developer />,
    children: [
      {
        path: 'api',
        element: <API />,
      },
      {
        path: 'playground',
        element: <Playground />,
      },
      {
        path: 'docs',
        element: <Docs />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/public/:id',
    element: <Public />,
  },
])

import { pullUserLibrary } from './api/sync'

const App = () => {
  const helmetContext = {}
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      pullUserLibrary(userId);
    }
  }, []);

  return (
    <div className='text-white bg-[#0f0f0f]'>
      <HelmetProvider context={helmetContext}>
        <Suspense fallback={<Loading />}>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools /> */}
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Suspense>
      </HelmetProvider>
    </div>
  )
}

export default App
