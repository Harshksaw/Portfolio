import logo1 from "../assets/app-design.png"
import logo2 from "../assets/app-design.png"
import logo3 from "../assets/app-design.png"
import logo4 from "../assets/adobe.png"
import logo5 from "../assets/adobe.png"
import logo6 from "../assets/adobe.png"
import logo7 from "../assets/microsoft.png"

const Experience = () => {
    const technologies = [
        { id: 1, src: logo1, title: 'HTML', style: 'shadow-orange-500' },
        { id: 2, src: logo2, title: 'CSS', style: 'shadow-blue-500' },
        { id: 3, src: logo3, title: 'JS', style: 'shadow-yellow-500' },
        { id: 4, src: logo4, title: 'REACT', style: 'shadow-blue-800' },
        { id: 5, src: logo5, title: 'REDUX', style: 'shadow-purple-500' },
        { id: 6, src: logo6, title: 'GITHUB', style: 'shadow-purple-500' },
        { id: 7, src: logo7, title: 'REDUX', style: 'shadow-purple-500' },
    ]

    return (
        <div name="experience" className="bg-gradient-to-b from-gray-400 to-violet-500 w-full h-screen">
            <div>
                <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-centerw-full h-full text-white ">
                    <div>

                        <h1 className="text-4xl font-bold border-b-4 border-gray-300 p-2 inline">Experience</h1>
                        <p className="py-6">These are the technologies i have worked with</p>
                    </div>


                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0 ">
                        {technologies.map(({ id, src, title, style }) => (
                            <div  key={id}  className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}` }>
                                <img src={src} alt="" className="w-20 mx-auto"  />
                                <p className="mt-4">{title}</p>

                            </div>

                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experience
