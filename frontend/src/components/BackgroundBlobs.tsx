export default function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute w-96 h-96 bg-sky-100 rounded-full top-[-80px] left-[-80px] blur-[100px] opacity-30" />
      <div className="absolute w-72 h-72 bg-violet-100 rounded-full bottom-[-60px] right-[-40px] blur-[80px] opacity-20" />
      <div className="absolute w-64 h-64 bg-emerald-100 rounded-full top-[40%] left-[50%] blur-[90px] opacity-10" />
    </div>
  )
}
