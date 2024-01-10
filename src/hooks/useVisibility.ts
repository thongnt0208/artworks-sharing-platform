import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { hideFooterRoutes, hideHeaderRoutes } from "../const/uiConstants";

export const useHeaderVisibility = () => {
  const location = useLocation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
    setIsHeaderVisible(!shouldHideHeader);
  }, [location]);

  return isHeaderVisible;
};

export const useFooterVisibility = () => {
  const location = useLocation();
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  useEffect(() => {
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
    setIsFooterVisible(!shouldHideFooter);
  }, [location]);

  return isFooterVisible;
};
