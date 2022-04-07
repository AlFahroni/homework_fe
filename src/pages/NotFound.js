import React from 'react'
import { useDocumentTitle } from '../lib/customHooks'

export default function NotFound() {
  useDocumentTitle('Not Found')
  return (
    <main className="center">
      Pages Not Found
      <button href="/create-playlist">Back to Main Page</button>
    </main>
  )
}