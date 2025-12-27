import { useParams } from "react-router-dom";
import Home from "../Home";

const GeneralExpenseWrapper = () => {
  const { year, month, week } = useParams();

  return (
    <Home
      injectedMeta={{
        contextType: "general",
        year: Number(year),
        month,
        week,
      }}
    />
  );
};

export default GeneralExpenseWrapper;
