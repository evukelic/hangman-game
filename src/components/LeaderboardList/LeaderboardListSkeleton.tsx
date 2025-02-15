import { List, Skeleton } from "@mui/material";

const LeaderboardListSkeleton = () => {
  return (
    <List>
      {[1, 2, 3, 4, 5].map((index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          sx={{ marginTop: "1rem", height: "2rem" }}
        />
      ))}
    </List>
  );
};

export default LeaderboardListSkeleton;
