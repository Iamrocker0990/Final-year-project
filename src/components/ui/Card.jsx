import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default Card;
