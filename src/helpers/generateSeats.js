export const generateSeats = () => {
  const seats = [];
  for (let i = 1; i <= 60; i++) {
    const status = Math.random();
    /*
      Example seat distribution logic:
      - 20% filled by male
      - 20% filled by female
      - 60% open
      You can adjust the logic to meet your needs
    */
    if (status < 0.2) {
      seats.push({
        id: i,
        type: "filled",
        occupant: "Male",
      });
    } else if (status < 0.4) {
      seats.push({
        id: i,
        type: "female",
        occupant: "Female",
      });
    } else {
      seats.push({
        id: i,
        type: "open",
        occupant: "Unoccupied",
      });
    }
  }
  return seats;
};
