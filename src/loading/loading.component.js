import React, { useEffect, useState } from "react";
import {
  State$,
  startLoading,
  stopLoading,
  initialState
} from "./loading.helpers.js";

export default function Loading(props) {
  const [loadingText, setLoadingText] = useState(initialState.currentText);
  const [className, setClassName] = useState(initialState.classNames);
  useEffect(() => {
    startLoading();
    const sub = State$.subscribe(newState => {
      setLoadingText(newState.currentText);
      setClassName(newState.classNames);
    });
    return () => {
      stopLoading();
      sub.unsubscribe();
    };
  }, []);
  return <div className={className}>{loadingText}</div>;
}
