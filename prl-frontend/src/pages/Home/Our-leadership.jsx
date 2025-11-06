import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TeamSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const teamMembers = [
    {
      id: 1,
      name: "Leader Name",
      position: "MD",
      image:
        "https://img.freepik.com/free-photo/close-up-portrait-happy-bearded-man-with-white-smile-standing-casual-clothes-white-background_176420-50111.jpg?semt=ais_hybrid&w=740",
      bio: "Visionary leader with 15+ years in packaging innovation. Passionate about sustainable solutions.",
    },
    {
      id: 2,
      name: "Leader Name",
      position: "MD",
      image:
        "https://img.freepik.com/free-photo/happy-bearded-man-business-clothes-looking-camera_171337-11392.jpg",
      bio: "Operations expert with a decade of experience in streamlining packaging processes.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0, rotate: -2 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.4 },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-violet-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-violet-400 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-red-400 mix-blend-multiply filter blur-xl animate-blob"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.h3
            className="text-4xl md:text-5xl font-bold text-violet-900 mb-4"
            variants={textVariants}
          >
            Our <span className="text-red-600">Leadership</span> Team
          </motion.h3>
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-violet-600 to-red-500 rounded-full mb-8"
            variants={textVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-violet-700 max-w-2xl"
            variants={textVariants}
          >
            Meet the visionaries driving innovation and excellence at our
            organization
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="flex flex-col lg:flex-row gap-8 items-center"
            >
              {/* Team Member Card */}
              <motion.div
                className="relative group w-full max-w-md lg:w-1/2"
                whileHover="hover"
                variants={imageVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-red-500/20 rounded-3xl transform rotate-3 -z-10 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-red-500/10 rounded-3xl transform -rotate-2 -z-10 group-hover:-rotate-4 transition-transform duration-500"></div>

                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover border-4 border-white/80"
                  initial={{ scale: 0.98 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

              {/* Team Member Info */}
              <motion.div
                variants={textVariants}
                className="w-full lg:w-1/2 text-center lg:text-left space-y-4"
              >
                <motion.h4
                  className="text-2xl font-bold text-violet-900"
                  initial={{ x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {member.name}
                </motion.h4>

                <motion.p
                  className="text-red-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {member.position}
                </motion.p>

                <motion.p
                  className="text-violet-700 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {member.bio}
                </motion.p>

                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="inline-flex space-x-4">
                    <a
                      href="#"
                      className="text-violet-600 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-violet-600 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-violet-600 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
