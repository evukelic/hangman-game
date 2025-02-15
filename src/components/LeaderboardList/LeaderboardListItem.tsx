import { Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import { MEDAL_URL } from "../../utils/constants";
import styles from "./LeaderboardListItem.module.css";

interface LeaderboardListItemProps {
  readonly index: number;
  readonly name: string;
  readonly score: number;
}

const LeaderboardListItem = ({
  index,
  name,
  score,
}: LeaderboardListItemProps) => {
  const shouldGetMedal = (index: number) => {
    return index < 3;
  };

  return (
    <>
      {index !== 0 && <Divider />}

      {shouldGetMedal(index) ? (
        <ListItem disablePadding>
          <ListItemIcon>
            <img
              src={MEDAL_URL.replace("%s", index.toString())}
              alt="medal"
              className={styles.medalIcon}
            />
          </ListItemIcon>
          <ListItemText primary={name} className={styles.listItemText} />
          <ListItemText
            primary={Math.round(score)}
            className={styles.listItemText}
          />
        </ListItem>
      ) : (
        <ListItem disablePadding>
          <ListItemText inset primary={name} className={styles.listItemText} />
          <ListItemText
            inset
            primary={Math.round(score)}
            className={styles.listItemText}
          />
        </ListItem>
      )}
    </>
  );
};

export default LeaderboardListItem;
