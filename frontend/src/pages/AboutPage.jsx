import { motion } from "framer-motion";
import React from "react";
import Navbar from "../components/common/Nav";
import Footer from "../components/Footer";
import ContactSectionForm from "../components/ContactFormSection";

const AboutPage = () => {
  return (
  
             <div className="w-[100%] bg-gradient-to-br from-[#242530] via-[#1A1C22] to-[#101015] text-white min-h-screen">
       <div className="mb-3"> <Navbar/></div>
      {/* Header Section */}
      <header className="relative text-center py-20 my-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            About EduElevate
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Empowering education through technology and creativity.
          </p>
        </motion.div>
        {/* Mouse Move Animation */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div
            className="w-40 h-40 bg-purple-500 blur-3xl opacity-30 absolute"
            animate={{ x: [-50, 50, -50], y: [50, -50, 50] }}
            transition={{ repeat: Infinity, duration: 10 }}
          />
          <motion.div
            className="w-32 h-32 bg-indigo-500 blur-2xl opacity-20 absolute"
            animate={{ x: [50, -50, 50], y: [-50, 50, -50] }}
            transition={{ repeat: Infinity, duration: 15 }}
          />
        </div>
      </header>

      {/* About Us Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative md:w-1/2"
          >
            <img
              src="https://via.placeholder.com/500"
              alt="About EduElevate"
              className="rounded-xl shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300"
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-purple-400 to-indigo-600 rounded-xl opacity-20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:w-1/2 text-gray-300"
          >
            <h2 className="text-4xl font-semibold mb-4 text-white">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed">
              At <strong>EduElevate</strong>, our mission is to bridge the gap
              between technology and education by providing a seamless learning
              platform. We aim to empower learners with cutting-edge tools,
              engaging content, and innovative experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-[#1A1C22] to-[#101015] py-16">
        <div className="px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-center text-white mb-12">
            Why Choose EduElevate?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Interactive Learning", desc: "AI-powered tools and animations for engagement." },
              { title: "Expert Mentorship", desc: "Learn from top industry leaders." },
              { title: "Personalized Growth", desc: "Tailored learning experiences for every student." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-[#242530] rounded-lg shadow-md hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-2 text-purple-400">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold text-center text-white mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Krishna", role: "Founder", img: "https://via.placeholder.com/150" },
            { name: "Aarav", role: "Co-Founder", img: "https://via.placeholder.com/150" },
            { name: "Priya", role: "Lead Developer", img: "https://via.placeholder.com/150" },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#242530] p-6 rounded-lg shadow-lg hover:shadow-purple-500/40 transition-shadow duration-300 text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-purple-400">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* contact form */}
      <ContactSectionForm/>

          {/* review  */}
      <div>
        {/* <Reviews/> */}
      </div>

      {/* footer */}
      <div ><Footer/></div>
    </div>

  );
};

export default AboutPage;
