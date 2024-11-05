
import { motion } from 'framer-motion'

function Cover() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="cover rounded-lg shadow-lg"
    >
      <div className="cover-inner p-6 flex flex-col items-center">
        
        <div className="cover-icon w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
          <img 
            src="/api-icon.svg" 
            alt="API Icon"
            className="w-8 h-8"
          />
        </div>

        <h2 className="cover-title text-2xl font-bold mt-6">API Section</h2>

        <p className="cover-description text-gray-600 text-center mt-2">
          Access our powerful API to build amazing integrations
        </p>

        <button 
          className="cover-button py-2 px-4 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Learn More
        </button>

      </div>

    </motion.div>
  )
}

export default Cover
