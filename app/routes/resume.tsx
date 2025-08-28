import React, { use, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";

const resume = () => {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate(`/auth?next=resume/${id}`);
    }
  }, [auth.isAuthenticated]);
  const { id } = useParams();
  return <div>Resume {id}</div>;
};

export default resume;
