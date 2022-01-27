import {AnimateSharedLayout, motion} from 'framer-motion'
import styles from './segmentedcontrol.module.css'

const items = ['Restaurant', 'Bar']

const SegmentedControl = ({activeItem, setActiveitem}) => {
    return (
        <div className="text-center pt-20">
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
                                    {isActive &&
                                    <motion.div layoutId="SegmentedControlActive" className={styles.active}/>}
                                    <span className={styles.label}>{item}</span>
                                </button>
                            </motion.li>
                        )
                    })}
                </ol>
            </AnimateSharedLayout>
        </div>
    )
}

export default SegmentedControl