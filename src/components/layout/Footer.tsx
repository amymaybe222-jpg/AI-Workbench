export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-3 text-xs text-text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} AI Workbench. Built for professionals learning to work with AI.</p>
        <p className="font-mono">v1.0.0</p>
      </div>
    </footer>
  );
}
