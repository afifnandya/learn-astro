export interface City {
  id: string;
  type: "cities";
  attributes: {
    name: string;
    homeDescription: string;
  };
}
