

function Terminal() {

    return <div className="flex flex-col p-2 w-4/5 text-green-700 bg-black rounded-2xl shadow-[10px_10px_20px_0_black,-10px_-10px_20px_0_rgba(64,64,64,0.5)]">
        <table className="flex-1 h-[150rem]">
            <tbody>
                <tr><td>Hello!</td></tr>
                <tr><td>Welcome to codegambit where you can improve your chess skills while getting comfortable entering commands into a terminal.</td></tr>
            </tbody>
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