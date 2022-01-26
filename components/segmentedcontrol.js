import {useState} from 'react'
import {AnimateSharedLayout, motion} from 'framer-motion'
import styles from './segmentedcontrol.module.css'

const items = ['Restaurant', 'Bar']

const SegmentedControl = () => {
    const [activeItem, setActiveitem] = useState(0)
    return (
        <AnimateSharedLayout>
            <ol className={styles.list}>
                {items.map((item, i) => {
                    const isActive = i === activeItem
                    return (
                        <motion.li
                            className={isActive || i === activeItem - 1 ? styles.itemNoDivider : styles.item}
                            whileTap={isActive ? {scale: 0.95} : {opacity: 0.6}}
                            key={item}
                        >
                            <button onClick={() => setActiveitem(i)} type="button" className={styles.button}>
                                {isActive && <motion.div layoutId="SegmentedControlActive" className={styles.active}/>}
                                <span className={styles.label}>{item}</span>
                            </button>
                        </motion.li>
                    )
                })}
            </ol>
        </AnimateSharedLayout>
    )
}

export default SegmentedControl