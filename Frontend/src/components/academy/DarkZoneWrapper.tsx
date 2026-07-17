export function DarkZoneWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div id="dark-zone" className="relative z-30 bg-transparent">
      {children}
    </div>
  );
}