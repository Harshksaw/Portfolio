

const Contact = () => {
  return (
    <div name='contact'  className="w-full h-screen bg-gradient-to-b from-black tp bg-gray-200 text-white">
        <div className="flex flex-col  p-4 justify-center max-w-screen-lg mx-auto h-full ">
            <div className="pb-8">
                <h1 className="text-4xl font-bold inline border-b-4 border-gray-500">Contact</h1>
                <p className="py-6">Fill in the for to get in touch with me</p>
            </div>

            <div className="flex justify-center items-center">
                <form action="https://getform.io/f/cf750f9a-b727-4985-8362-d817d617657e"  method="POST" className="flex flex-col w-full md:w-1/2">
                    <input type="text" name="name" placeholder="Enter your name"  className=" my-4 p-2 bg-transparent border-2 rounded-md text-white  focus: outline-none "/>
                    <input type="text" name="name" placeholder="Enter your Email"  className="my-4 p-2 bg-transparent border-2 rounded-md text-white  focus: outline-none"/>

                    <textarea
                    name="message"
                    rows="10"
                    className="p2 bg-transparent border-2 rounded-md text-white focus:outline-none"
                    ></textarea>



                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-100 duration-300 "  type="submit">Lets talk</button>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Contact
