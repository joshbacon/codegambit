

function Terminal() {

    return <div className="flex flex-col  p-2 w-4/5 text-green-700 bg-black rounded-2xl shadow-xl shadow-green-950/50">
        <table className="flex-1 h-full">
            <tr><td>Hello!</td></tr>
            <tr><td>Welcome to codegambit where you can improve your chess skills while getting comfortable entering commands into a terminal.</td></tr>
        </table>
        <div className="flex items-center">
            <h1 className="text-1xl font-bold">{'>'}</h1>
            <input
                type="text"
                className="h-12 ml-3 w-full focus:outline-0"
            />
        </div>
    </div>
}

export default Terminal;