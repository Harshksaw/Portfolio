//

export default function Cta() {
  return (
    <div className='h-72 md:h-96 -mt-16 w-full bg-gradient-to-br from-primary-darkest to-primary-darker rounded-3xl relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-primary-violet/10'>
        <div className='h-8 w-60 bg-gradient-to-r from-primary-violet to-primary-purple z-10 rounded-3xl absolute bottom-6 -left-6 shadow-[0_0_30px_rgba(221,74,255,0.3)]'/>
        <div className='h-8 w-60 bg-gradient-to-r from-primary-main to-primary-light z-10 rounded-3xl absolute top-6 -right-6 shadow-[0_0_30px_rgba(18,113,255,0.3)]'/>
        <div className='h-full w-full flex items-center justify-center flex-col z-10 rounded-3xl absolute top-0 right-0 left-0 bottom-0'>
            <h4 className='text-4xl md:text-6xl  text-white font-bitcount'>Get In Touch</h4>
            <div className='flex gap-8 p-4'>
                <a href="mailto:mister.harshkumar@gmail.com"
                target='_blank'
                className='hover:bg-primary-light group p-2 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(100,220,255,0.5)]'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 group-hover:fill-primary-darkest  transition-colors duration-300">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>

                </a>
                <a href="https://wa.me/17785832260"
                target='_blank'
                className='hover:bg-primary-violet group p-2 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(221,74,255,0.5)]'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 group-hover:fill-primary-darkest  transition-colors duration-300">
  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
</svg>


                </a>
            </div>
        </div>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster=""
      >
        <source src="/videos/ctavideo0.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    
    </div>
  )
}
