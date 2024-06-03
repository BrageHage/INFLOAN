import { getInventory } from "../utils/functions";

const Loan = () => {
  getInventory().then((data) => {
    console.log(data);
  });

  return (
    <div>
      <h1>Loans</h1>
    </div>
  );
};

export default Loan;
