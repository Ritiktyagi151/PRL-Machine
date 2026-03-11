import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ProductDetailuPVC from "./ProductDetailuPVC";
import ProductDetailAluminium from "./ProductDetailAluminium";

const UPVC_API_URL = `${import.meta.env.VITE_API_BASE_URL}/upvcmachines`;
const ALUMINUM_API_URL = `${import.meta.env.VITE_API_BASE_URL}/aluminum-machines`;

const ProductSlugPage = () => {
  const { productSlug } = useParams();
  const [productType, setProductType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const resolveProductType = async () => {
      if (!productSlug) {
        if (isMounted) {
          setProductType("missing");
          setLoading(false);
        }
        return;
      }

      try {
        const [upvcResponse, aluminumResponse] = await Promise.all([
          fetch(`${UPVC_API_URL}/${productSlug}`),
          fetch(`${ALUMINUM_API_URL}/${productSlug}`),
        ]);

        if (!isMounted) return;

        if (upvcResponse.ok) {
          setProductType("upvc");
          return;
        }

        if (aluminumResponse.ok) {
          setProductType("aluminum");
          return;
        }

        setProductType("missing");
      } catch (error) {
        console.error("Error resolving product slug:", error);
        if (isMounted) {
          setProductType("missing");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    resolveProductType();

    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#46266A]"></div>
      </div>
    );
  }

  if (productType === "upvc") {
    return <ProductDetailuPVC productIdentifier={productSlug} />;
  }

  if (productType === "aluminum") {
    return <ProductDetailAluminium productIdentifier={productSlug} />;
  }

  return <Navigate to="/products" replace />;
};

export default ProductSlugPage;
