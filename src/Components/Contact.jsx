

const Contact = () => {
  return (
    <div name='contact'  className>
        <div>
            <div>
                <h1>Contact</h1>
                <p>Fill in the for to get in touch with me</p>
            </div>

            <div>
                <form action="" >
                    <input type="text" name="name" placeholder="Enter your name"  className="p-2 bg-transparent border-2 rounded-md text-white  focus: outline-none "/>
                    <input type="text" name="name" placeholder="Enter your Email"  className="p-2 bg-transparent border-2 rounded-md text-white  focus: outline-none"/>

                    <textarea
                    name="message"
                    rows="10"
                    className="p2 bg-transparent border-2 rounded-md text-white focus:outline-none"
                    ></textarea>



                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-100 duration-300 ">Lets talk</button>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Contact
