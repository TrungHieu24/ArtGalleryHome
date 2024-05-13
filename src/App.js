import React, { useEffect } from "react";
import { useJwt } from "react-jwt";
import { getAccessToken } from "./utils/auth.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/common/Footer.js";
import Header from "./components/common/Header.js";
import Home from "./components/pages/homepage/Home.js";
import Artists from "./components/pages/artist/Artists.js";
import ContactUs from "./components/pages/aboutus/ContactUs.js";
import Event from "./components/pages/events/Event.js";
import ArtworkDetail from "./components/pages/artwork/ArtworkDetail.js";
import Offer from "./components/pages/offer/Offer.js";
import Shipping from "./components/pages/other/Shipping.js";
import Payment from "./components/pages/checkout/Payment.js";
import Review from "./components/pages/other/Review.js";
import AboutUs from "./components/pages/aboutus/AboutUs.js";
import ViewingRooms from "./components/pages/viewingroom/ViewingRooms.js";
import ArtistDetail from "./components/pages/artist/ArtistDetail.js";
import Artwork from "./components/pages/artwork/Artwork.js";
import ListArt from "./components/pages/artist/ListArtist.js";
import LoginAndRegister from "./components/pages/auth/Login.js";
import authMiddleware from "./context/authMiddleware.js";
function App() {

  const ProtectedRoute = authMiddleware(({ element }) => element);

  const ProtectedLoginRoute = ({ element }) => {
    const token = getAccessToken();
    const { isExpired, isInvalid } = useJwt(token);

    if (token && !isExpired && !isInvalid) {
      return <Navigate to="/" />;
    }

    return element;
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Auth */}

          <Route path="/login" element={<ProtectedLoginRoute element={<LoginAndRegister />} />}>
          </Route>

          {/* End Auth */}

          {/* Profile */}

          {/* <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> */}

          {/* End Profile */}

          {/* Home */}

          <Route path="/" element={<Home />} />

          {/* End Home */}

          {/* Artist */}

          <Route path="/artists" element={<Artists />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />

          {/* End Artist */}

          {/* Artwork */}

          <Route path="/artwork" element={<Artwork />} />
          <Route path="/artworklist" element={<ListArt />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />

          {/* End Artwork */}

          {/* About Us */}

          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />

          {/* End About Us */}

          {/* Offer */}

          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment/:offerCode" element={<Payment />} />

          {/* End Offer */}

          {/* Event */}

          <Route path="/event" element={<Event />} />

          {/* End Event */}

          {/* Viewing Room */}

          <Route path="/viewingroom" element={<ViewingRooms />} />

          {/* End Viewing Room */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
