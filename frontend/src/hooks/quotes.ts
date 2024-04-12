import { useEffect, useState } from "react";
import { get, getURL } from "../lib/util";
import { useNavigate } from "react-router-dom";
import { AllQuotesResponse } from "../../../shared/types";

export function useQuotes():
  | [quotes: null, loading: true]
  | [quotes: AllQuotesResponse, loading: false] {
  const [quotes, setQuotes] = useState<AllQuotesResponse | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    get(getURL("/quote"), navigate)
      .then((quoteResponse) => quoteResponse.json())
      .then((quotes) => setQuotes(quotes));
  }, []);

  if (quotes === null) {
    return [quotes, true];
  } else {
    return [quotes, false];
  }
}
