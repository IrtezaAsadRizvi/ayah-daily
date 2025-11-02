import styles from './Checkbox.module.css';

export default function Checkbox({ id, label, checked, onChange, disabled }) {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className={styles.wrapper43}>
            <input
                id={inputId}
                type="checkbox"
                className={styles.input}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />
            <label htmlFor={inputId} className={styles.check}>
                {/* animated box */}
                <svg className={styles.icon} viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
                    <polyline points="1 9 7 14 15 4" />
                </svg>

                {/* text label (clickable) */}
                <span className='text-base'>{label}</span>
            </label>
        </div>
    );
}
