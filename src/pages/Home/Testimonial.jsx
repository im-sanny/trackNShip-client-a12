const Testimonial = () => {
  const testimonials = [
    {
      name: 'John Mos',
      position: 'CEO, Tech Solutions',
      image: 'https://i.ibb.co/30YTJVR/school.png',
      feedback:
        'TrackNShip has greatly improved our logistics efficiency. Their service is reliable and incredibly easy to use.',
      bgColor: '',
    },
    {
      name: 'Jane Smith',
      position: 'Logistics Manager, Retail Corp',
      image: 'https://i.ibb.co/zn9j4mZ/student-4.png',
      feedback:
        'I love using TrackNShip! The user dashboard is intuitive and the unlimited pickup option is a game-changer for me.',
      bgColor: '',
    },
    {
      name: 'Robert Brown',
      position: 'Operations Head, Logistics Co.',
      image: 'https://i.ibb.co/9H2c0Cn/boy-1.png',
      feedback:
        'The multiple payment methods provided by TrackNShip make it easy for us to manage transactions smoothly.',
      bgColor: '',
    },
  ];

  const renderTestimonial = ({ name, position, image, feedback, bgColor }) => (
    <div
      className={`flex flex-col max-w-sm mx-4 my-6 shadow-lg ${bgColor} rounded-3xl border border-muted-foreground`}
    >
      <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 flex-grow">
        <p className="relative px-6 py-1 text-lg italic text-center text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="w-8 h-8 text-violet-400 dark:text-violet-600"
          >
            <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
            <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
          </svg>
          {feedback}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="absolute right-0 w-8 h-8 text-violet-400 dark:text-violet-600"
          >
            <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
            <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
          </svg>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center p-8 rounded-b-lg text-muted-foreground">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full"
        />
        <p className="text-xl font-semibold leading-tight">{name}</p>
        <p className="text-sm uppercase">{position}</p>
      </div>
    </div>
  );

  return (
    <>
      <section className="mb-10">
        <div className="container flex flex-col items-center mx-auto md:px-12">
          <h1 className="text-4xl font-semibold leading-none text-center">
            Customer Feedback About <br /> TrackNShip
          </h1>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
          {testimonials.map(renderTestimonial)}
        </div>
      </section>
    </>
  );
};

export default Testimonial;
