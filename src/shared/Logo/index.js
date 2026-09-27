import React from 'react';
import styles from "../Header/Header.module.sass";
import Image from "../Image";
import {Link} from "react-router-dom";

const Index = () => {
    return (
        <div className={styles.logo}>
            <Link className={styles.logo} to="/">
                <Image
                    className={styles.pic}
                    src="/leadbro/Logo.svg"
                    srcDark="/leadbro/Logo.svg"
                    alt="Core"
                />
            </Link>
        </div>
    );
};

export default Index;