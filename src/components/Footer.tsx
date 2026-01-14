import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-12 glass-strong mt-20"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.p
          className="text-white/60 text-sm"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Made with aurora magic
        </motion.p>
        <motion.p
          className="text-white/40 text-xs mt-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © {new Date().getFullYear()} - A special birthday celebration
        </motion.p>
      </div>
    </motion.footer>
  )
}

export default Footer

