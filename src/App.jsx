import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

// Inner pages are code-split; the homepage (and its cinematic hero) loads first.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Industries = lazy(() => import('./pages/Industries'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const Quality = lazy(() => import('./pages/Quality'))
const Careers = lazy(() => import('./pages/Careers'))
const News = lazy(() => import('./pages/News'))
const Article = lazy(() => import('./pages/Article'))
const Contact = lazy(() => import('./pages/Contact'))
const Quote = lazy(() => import('./pages/Quote'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

const Fallback = () => <div className="min-h-[100svh] bg-navy-900" aria-busy="true" />

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="industries" element={<Industries />} />
          <Route path="capabilities" element={<Capabilities />} />
          <Route path="quality-safety-sustainability" element={<Quality />} />
          <Route path="careers" element={<Careers />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<Article />} />
          <Route path="contact" element={<Contact />} />
          <Route path="request-a-quote" element={<Quote />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
