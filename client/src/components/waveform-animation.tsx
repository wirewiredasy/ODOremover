import { motion } from "framer-motion";

export default function WaveformAnimation() {
  const bars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="odo-waveform">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="odo-wave-bar"
          animate={{
            height: [8, 24, 8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: bar * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}