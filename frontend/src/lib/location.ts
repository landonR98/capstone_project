export enum Location {
  Dense_Urban,
  Urban,
  Rural,
}

export function locationMultiplier(location: Location): number {
  switch (location) {
    case Location.Dense_Urban:
      return 1.5;
    case Location.Urban:
      return 1.25;
    case Location.Rural:
      return 1;
  }
}

export function locationString(location: Location): string {
  switch (location) {
    case Location.Dense_Urban:
      return "Dense Urban";
    case Location.Urban:
      return "Urban";
    case Location.Rural:
      return "Rural";
  }
}
