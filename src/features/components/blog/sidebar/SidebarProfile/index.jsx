import Image from "next/image";
import styles from "./index.module.scss";
import profilePic from "@/public/assets/images/profile.jpg";

export const SidebarProfile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.me}>
        <div className={styles.box__image}>
          <Image
            src={profilePic}
            alt="プロフィール画像"
            width={800}
            height={800}
            className={styles.image}
          />
        </div>
        <p className={styles.name}>名前</p>
      </div>
      <div className={styles.text}>
        <p>
          2023年からWeb業界に足を踏み入れた新参者です。
          <br />
          今はReactを独学で勉強中です。
        </p>
      </div>
    </div>
  );
};
