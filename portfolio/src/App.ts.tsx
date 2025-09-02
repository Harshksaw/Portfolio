import { useState } from 'react';

// import './App.css'
export default function App() {
    const [waterLevel, setWaterLevel] = useState(50);
    const [tra, setTra] = useState(false);
console.log(tra)
    const increaseWaterLevel = () => {
        const newWaterLevel = Math.min(waterLevel + 10, 100);
        setTra((prev: any) => !prev)
        setWaterLevel(newWaterLevel);
    };

    // const animateWaterLevel = (newLevel: number) => {
    //     const rubberband = (t: number) => {
    //         const b = 0.2; // Tension
    //         const p = 0.3; // Period
    //         return Math.pow(Math.E, -b * t) * Math.cos((t - p / 4) * (2 * Math.PI) / p) + 1;
    //     };

    //     let start = waterLevel;
    //     let change = newLevel - start;
    //     let currentTime = 0;
    //     const duration = 300;

    //     const animate = () => {
    //         currentTime += 10;
    //         const t = currentTime / duration;
    //         const easedT = rubberband(t);
    //         setWaterLevel(start + change * easedT);

    //         if (t < 1) {
    //             requestAnimationFrame(animate);
    //         } else {
    //             setWaterLevel(newLevel);
    //         }
    //     };

    //     requestAnimationFrame(animate);
    // };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center">
            <section className="h-[400px] relative w-72 border-b-2 border-l-2 border-r-2 border-black flex flex-col justify-end overflow-x-clip  ">
                {/* ellipse  */}
                <div className={` ${waterLevel === 100 ? "bg-blue-500" : 'bg-transparent '} h-16 w-72  absolute z-50 rounded-[50%] border-2  -top-7 -left-px  `}/>
                {/* water  */}
                <div style={{height: `${waterLevel}%`}} className="flex transition-all duration-500 ease-in-out bg-blue-500 relative">
                    <div className={`h-12 w-72  overflow-hidden absolute -top-10 scale-125`}>
                        <div className={` h-full w-40 rounded-[50%] bg-white absolute left-0 `}/>
                        <div className={`h-full w-40 rounded-[50%] bg-blue-500 absolute right-0 top-7 `}/>


                    </div>
                 </div>
                 <button onClick={increaseWaterLevel}>Increase Volume</button>
             </section>
         </div>
    )
}
