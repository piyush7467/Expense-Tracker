import { useParams } from "react-router-dom";
import Home from "./Home";


const SpecialContextWrapper = () => {
  const { contextId } = useParams();

  return (
    <Home
      injectedMeta={{
        contextType: "special",
        specialContextId: contextId,
      }}
    />
  );
};

export default SpecialContextWrapper;
