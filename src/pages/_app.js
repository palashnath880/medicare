import Layout from '@/layout'
import AuthProvider from '@/providers/AuthProvider'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AuthProvider>
}
