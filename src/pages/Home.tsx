const Home = () => {
    return (
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["bg-red-500", "bg-blue-500", "bg-green-500", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-red-500", "bg-blue-500", "bg-green-500"].map((color, index) => (
          <div key={index} className={`h-32 flex justify-center items-center text-white font-bold text-xl rounded-lg shadow-lg ${color}`}>
            Box {index + 1}
          </div>
        ))}
      </div>
    );
  };
  export default Home;
  

