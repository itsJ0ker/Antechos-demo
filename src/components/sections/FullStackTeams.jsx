const FullStackTeams = () =>{
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Full Stack Teams</h1>
            <p className="text-lg text-gray-700">Explore our full stack development teams.</p>
            <Link to="/Marketplace" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Back to Marketplace
            </Link>
        </div>
    );
}

export default FullStackTeams;