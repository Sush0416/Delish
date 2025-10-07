import { motion } from 'framer-motion';

// Page transitions
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

// Stagger children animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

// Fade in animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

// Scale animations
export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
};

export const scaleInUp = {
  initial: { scale: 0.8, y: 20, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  exit: { scale: 0.8, y: -20, opacity: 0 }
};

// Slide animations
export const slideInUp = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 }
};

export const slideInDown = {
  initial: { y: '-100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '-100%', opacity: 0 }
};

export const slideInLeft = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 }
};

export const slideInRight = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 }
};

// Bounce animations
export const bounceIn = {
  initial: { scale: 0.3, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  exit: {
    scale: 0.3,
    opacity: 0
  }
};

// Flip animations
export const flipIn = {
  initial: { rotateY: 90, opacity: 0 },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    rotateY: -90,
    opacity: 0
  }
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const hoverLift = {
  whileHover: { y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' },
  whileTap: { y: 0 }
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)',
    scale: 1.02
  }
};

// Loading animations
export const loadingVariants = {
  start: {
    scale: 0.8,
    opacity: 0.5
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

// Pulse animation
export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Staggered list animation
export const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren'
    }
  }
};

export const listItemVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 }
};

// Custom animation components
export const AnimatedPage = ({ children, ...props }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, ...props }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, ...props }) => (
  <motion.div variants={itemVariants} {...props}>
    {children}
  </motion.div>
);