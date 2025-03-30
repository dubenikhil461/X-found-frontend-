import { motion } from "framer-motion";
import "./AboutUs.css";

const teamMembers = [
  { name: "Nikhil Dubey", email: "nikhildubey461@gmail.com" },
  { name: "Aryan Singh", email: "" },
  { name: "Prateek Gupta", email: "" },
  { name: "Gaurav Dabi", email: "" },
];

export default function AboutUs() {
  return (
    <div className="about-container">
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About X-Found
      </motion.h1>

      <div className="custom-card">
        <div className="custom-card-content">
          <p className="about-text">
            X-Found is a college-based platform designed to help students
            exchange items and find lost belongings with ease. Our goal is to
            create a seamless and reliable system that connects students across
            campuses efficiently. Whether you are looking to buy, sell, or
            recover lost items, X-Found provides a simple and effective
            solution.
          </p>
          <p className="about-text">
            Our platform ensures a secure and transparent transaction process,
            allowing students to interact and communicate effortlessly within
            their college network. With a user-friendly interface and real-time
            updates, we strive to enhance the experience of students in managing
            their items efficiently and fostering a sense of community within
            educational institutions.
          </p>
          <h2 className="developer-title">Meet the Developers:</h2>
          <p className="developer-info">
            All developers are 2nd year IoT students from CBST, Lokmanya Tilak
            College of Engineering.
          </p>
          <ul className="developer-list">
            {teamMembers.map((member, index) => (
              <motion.li
                key={index}
                className="developer-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                <span className="developer-name">{member.name}</span>
                {member.email && (
                  <span className="developer-email">
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
          <p className="about-footer">
            We are committed to making X-Found a trusted and valuable resource
            for students. Our dedicated team is continuously working to improve
            the platform, ensuring a seamless and efficient experience for all
            users. Stay connected and be part of the X-Found college community!
          </p>
        </div>
      </div>
    </div>
  );
}
