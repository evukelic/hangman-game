import { List } from "@mui/material";

import { LeaderboardProps } from "../../routes/Leaderboard";
import styles from "./LeaderboardList.module.css";
import LeaderboardListItem from "./LeaderboardListItem";
import LeaderboardListSkeleton from "./LeaderboardListSkeleton";

interface LeaderboardListProps {
  readonly data: LeaderboardProps[];
  readonly isDataLoading: boolean;
}

const LeaderboardList = ({ data, isDataLoading }: LeaderboardListProps) => {
  return (
    <List className={styles.leaderboardList}>
      {isDataLoading ? (
        <LeaderboardListSkeleton />
      ) : (
        data.map((item: LeaderboardProps, index: number) => (
          <LeaderboardListItem
            key={index}
            index={index}
            name={item.userName}
            score={item.score}
          />
        ))
      )}
    </List>
  );
};

export default LeaderboardList;
