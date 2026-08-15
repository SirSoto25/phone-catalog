'use client';

import styles from './SearchBar.module.scss';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
    return (
        <div className={styles.wrap}>
            <label htmlFor="search" className={styles.srOnly}>
                Search
            </label>
            <input 
                id="search"
                type="search"
                className={styles.input}
                placeholder="Search for a smartphone..."
        autoComplete="off"
                value={value}
                onChange={(e) => onChange(e.target.value)}
             />
        </div>
    );
}