import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { getCanonicalProductPath } from "../../utils/productRouting";

const LegacyProductRedirect = () => {
  const params = useParams();
  const productSlug = params.productSlug || params.id || params.identifier;

  return <Navigate to={getCanonicalProductPath(productSlug)} replace />;
};

export default LegacyProductRedirect;
