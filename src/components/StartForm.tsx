import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { useInputValidate } from "../hooks/useInputValidate";
import { AppDispatch } from "../redux/store";
import { setUsername } from "../redux/userActions";
import { RoutePath } from "../utils/enums";
import styles from "./StartForm.module.css";

const StartForm = () => {
  const input = useInputValidate();
  const navigateTo = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.validate()) {
      dispatch(setUsername(input.value));
      navigateTo(RoutePath.GAME);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Box className={styles.inputContainer}>
        <TextField
          id="name"
          value={input.value}
          onChange={input.onChange}
          variant="outlined"
          name="name"
          label="Enter your name"
          error={!!input.error}
          helperText={input.error}
          className={styles.input}
          size="small"
          slotProps={{
            inputLabel: { className: styles.inputLabel },
            input: { className: styles.inputText },
            formHelperText: { className: styles.helperText },
          }}
        />
      </Box>

      <Button type="submit" variant="contained" className={styles.startButton}>
        Start
      </Button>
    </form>
  );
};

export default StartForm;
