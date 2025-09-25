import { useApp } from "./AppContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loadingUser } = useApp(); // ambil dari context

  if (loadingUser) {
    return <div>Loading…</div>;
  }

  if (!currentUser) {
    // belum login / token invalid
    window.location.href = "/auth";
    return null;
  }

  return children;
}
