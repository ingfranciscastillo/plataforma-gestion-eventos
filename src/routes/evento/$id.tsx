import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/evento/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/evento/$id"!</div>
}
