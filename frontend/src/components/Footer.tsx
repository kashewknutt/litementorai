// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="text-center py-8 text-gray-500 text-sm font-outfit bg-white/80">
      &copy; {new Date().getFullYear()} LiteMentor.ai — Built with love by <a href="https://portfolio-rajatdisawal.vercel.app" className="underline hover:text-sky-500">Rajat Disawal</a>
    </footer>
  )
}
