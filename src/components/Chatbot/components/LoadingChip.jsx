import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { motion } from "framer-motion";
 
const LoadingChip = () => {
  const styles = {
    display: "flex",
  };
  // return (
  //     <div style={styles}>
  //         <motion.div initial={{ translateY: 0 }} animate={{ translateY: [0, -5, 0] }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2, repeat: Infinity }}>
  //             <FiberManualRecordIcon fontSize='extra-small' />
  //         </motion.div>
  //         <motion.div initial={{ translateY: 0 }} animate={{ translateY: [0, -5, 0] }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3, repeat: Infinity }}>
  //             <FiberManualRecordIcon fontSize='extra-small' />
  //         </motion.div>
  //         <motion.div initial={{ translateY: 0 }} animate={{ translateY: [0, -5, 0] }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4, repeat: Infinity }}>
  //             <FiberManualRecordIcon fontSize='extra-small' />
  //         </motion.div>
  //     </div>
  // );
  return (
    <div style={styles}>
      <motion.div
        style={{ display: "flex", position: "relative", height: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.2,
          repeat: Infinity,
        }}
      >
        <FiberManualRecordIcon fontSize="extra-small" />
      </motion.div>
      <motion.div
        style={{ display: "flex", position: "relative", height: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.3,
          repeat: Infinity,
        }}
      >
        <FiberManualRecordIcon fontSize="extra-small" />
      </motion.div>
      <motion.div
        style={{ display: "flex", position: "relative", height: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.4,
          repeat: Infinity,
        }}
      >
        <FiberManualRecordIcon fontSize="extra-small" />
      </motion.div>
    </div>
  );
};
 
export default LoadingChip;