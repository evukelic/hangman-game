export enum ColorPalette {
  PRIMARY = "#2F363C",
  SECONDARY = "#FFFFFF",
  INFO = "#E0E0E0",
}

export enum RoutePath {
  HOME = "/",
  GAME = "/game",
  LEADERBOARD = "/leaderboard",
  NOT_FOUND = "*",
}

export enum GameStatus {
  WON = "won",
  LOST = "lost",
  PLAYING = "playing",
}

export enum APIFetchStatus {
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}
