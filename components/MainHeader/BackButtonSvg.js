import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const BackButtonSvg = ({ color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M20 12H4"
      stroke={color}
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10 18L4 12L10 6"
      stroke={color}
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
