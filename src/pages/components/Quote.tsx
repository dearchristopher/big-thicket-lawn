export const Quote = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold text-red-600 mb-6 text-center font-futura">GET A FREE QUOTE</h3>
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Address</option>
                    <option>Lumberton, TX</option>
                    <option>Beaumont, TX</option>
                    <option>Other</option>
                </select>
                <textarea
                    placeholder="Services Needed"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors">
                    SEND REQUEST
                </button>
            </form>
        </div>)
}