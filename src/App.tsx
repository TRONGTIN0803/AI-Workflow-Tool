import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { LandingPage } from './pages/LandingPage'

const AuthPage = lazy(() => import('./pages/AuthPage').then((module) => ({ default: module.AuthPage })))
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })))
const BuilderPage = lazy(() => import('./pages/BuilderPage').then((module) => ({ default: module.BuilderPage })))
const TemplatesPage = lazy(() => import('./pages/TemplatesPage').then((module) => ({ default: module.TemplatesPage })))
const ExecutionsPage = lazy(() => import('./pages/ExecutionsPage').then((module) => ({ default: module.ExecutionsPage })))
const WorkflowDetailPage = lazy(() => import('./pages/WorkflowDetailPage').then((module) => ({ default: module.WorkflowDetailPage })))
const AssistantPage = lazy(() => import('./pages/AssistantPage').then((module) => ({ default: module.AssistantPage })))
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((module) => ({ default: module.SettingsPage })))

function LoadingScreen() {
  return <div className="flex min-h-[50vh] items-center justify-center"><div className="h-10 w-10 animate-pulse rounded-xl bg-violet-500/30" /></div>
}

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="builder" element={<BuilderPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="executions" element={<ExecutionsPage />} />
          <Route path="workflows/:id" element={<WorkflowDetailPage />} />
          <Route path="assistant" element={<AssistantPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
