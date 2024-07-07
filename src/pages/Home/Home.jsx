import Banner from "./Banner";
import Faq from "./Faq";
import Features from "./Features";
import Shop from "./Shop";
import Statistics from "./Statistics";
import Testimonial from "./Testimonial";
import TopDeliveryman from "./TopDeliveryman";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Shop></Shop>
      <Features></Features>
      <Statistics></Statistics>
      <TopDeliveryman></TopDeliveryman>
      <Testimonial></Testimonial>
      <Faq></Faq>
    </div>
  );
};

export default Home;
