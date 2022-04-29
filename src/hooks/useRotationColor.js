import { useState, useEffect, useContext } from "react";
import { Gyroscope } from "expo-sensors";
import { colord, extend } from "colord";
import names from "colord/plugins/names";
extend([names]);
import { useIsFocused } from "@react-navigation/native";

import ColorContext from "../ColorContext";

const INTERVAL = 300;
function useRotationColor() {
  const [color, setColor] = useContext(ColorContext);
  const [subscription, setSubscription] = useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      subscription && subscription.remove();
      setSubscription(null);
    } else {
      setSubscription(
        Gyroscope.addListener((rotation) => {
          setColor(rotateColor(color, rotation));
        })
      );
      Gyroscope.setUpdateInterval(INTERVAL);
    }
    return () => {
      subscription && subscription.remove();
      setSubscription(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, isFocused]);
  return color;
}

const G = 9.81;
function rotateColor(color, rotation) {
  const { z = 0 } = rotation;
  const dz =
    Math.abs(z) > G / 100 && Math.abs(z) < G ? Math.round((z * 360) / G) : 0;
  return colord(color).rotate(dz).toHex();
}

export default useRotationColor;
