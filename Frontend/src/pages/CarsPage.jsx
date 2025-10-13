import Navbar from "../components/Navbar.jsx";
import Search from "../components/Search.jsx";
import Cars from "../components/Cars.jsx";
import Footer from "../components/Footer.jsx";
import Chatbot from "../components/Chatbot.jsx";


const CarsPage = ({ cars }) => {
  return (
    <div
      className="font-sans"
      style={{ backgroundImage: "https://res.cloudinary.com/dqxtox5rl/image/upload/v1760378571/bgimg3_wyzhyf.jpg", 
        backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      <Navbar />
      <Search />
      <Cars cars={cars} />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default CarsPage;
