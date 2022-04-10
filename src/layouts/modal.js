import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
};

function Layout({ children }) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        background: 'rgba(95, 95, 95, 0.5)',
        backdropFilter: 'blur(10px)',
        fontSize: `13px`,
        width: `100%`,
        height: `100%`,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {children}
    </motion.div>
  );
}

export { Layout };
