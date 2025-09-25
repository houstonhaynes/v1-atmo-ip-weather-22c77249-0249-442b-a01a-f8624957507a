import { WeatherDisplay } from '@/components/WeatherDisplay';
export function HomePage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-darkest via-brand-dark to-brand-darkest text-brand-light relative overflow-hidden bg-[size:200%_200%] animate-gradient-bg">
      <div className="relative z-10 flex flex-col items-center w-full">
        <header className="text-center pt-16 md:pt-24">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">Atmo</h1>
            <p className="text-slate-300">Minimalist IP Weather</p>
        </header>
        {/* WeatherDisplay now has its own vertical padding, so we adjust the header/footer layout */}
        <WeatherDisplay />
      </div>
       <footer className="absolute bottom-4 text-center text-slate-400 text-sm">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </main>
  );
}