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

  // Details updated for Rajesh Kumar Parida
  const member = {
    id: 1,
    name: "Rajesh Kumar Parida",
    position: "Managing Director",
    image: "/assets/extra-img/rajesh-parida.jpeg", // Aap apni original image path yahan replace kar sakte hain
    bio: "Visionary leader and entrepreneur with extensive experience in the uPVC and Aluminium machinery industry. Under his guidance, Parida Red Lion has become a trusted name for quality and innovation.",
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const floatingImage = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-violet-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-violet-400 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-red-400 mix-blend-multiply filter blur-3xl animate-blob"></div>
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
            variants={itemVariants}
          >
            Our <span className="text-red-600">Leadership</span> Team
          </motion.h3>
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-violet-600 to-red-500 rounded-full mb-8"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-violet-700 max-w-2xl"
            variants={itemVariants}
          >
            Meet the visionary driving innovation and excellence at Parida Red
            Lion
          </motion.p>
        </motion.div>

        {/* Centered Member Card */}
        <div className="flex justify-center">
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row gap-12 items-center max-w-5xl bg-white/30 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/50 shadow-xl"
          >
            {/* Team Member Image with Animation */}
            <motion.div
              className="relative group w-full max-w-sm"
              variants={floatingImage}
              animate="animate"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-red-500/20 rounded-3xl transform rotate-3 -z-10 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-violet-600/10 rounded-3xl blur-2xl -z-20"></div>

              <motion.img
                src={member.image}
                alt={member.name}
                className="w-full h-[400px] rounded-3xl shadow-2xl object-cover border-4 border-white/80"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Team Member Info */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
              <div className="space-y-2">
                <h4 className="text-4xl font-bold text-violet-900">
                  {member.name}
                </h4>
                <p className="text-red-600 font-bold text-xl tracking-wide uppercase">
                  {member.position}
                </p>
              </div>

              <p className="text-violet-700 text-lg leading-relaxed italic">
                "{member.bio}"
              </p>

              <div className="pt-4">
                <div className="inline-flex space-x-6">
                  {/* LinkedIn Icon */}
                  <a
                    href="#"
                    className="text-violet-600 hover:text-red-500 transition-all transform hover:scale-125"
                  >
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  {/* Twitter Icon */}
                  <a
                    href="#"
                    className="text-violet-600 hover:text-red-500 transition-all transform hover:scale-125"
                  >
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
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
