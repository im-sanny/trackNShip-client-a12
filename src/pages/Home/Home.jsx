import Banner from './Banner';
import Features from './Features';
import Shop from './Shop';
import Statistics from './Statistics';
import TopDeliveryman from './TopDeliveryman';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Shop></Shop>
            <Features></Features>
            <Statistics></Statistics>
            <TopDeliveryman></TopDeliveryman>
        </div>
    );
};

export default Home;