import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function CustomBackButton() {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const handleNavBackButton = (e) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <div className="">
      {!isHomePage && <FontAwesomeIcon icon={faLeftLong} color="blue" />}
    </div>
  );
}
