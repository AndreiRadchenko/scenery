import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const LogoutSvg = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M17 16L21 12L17 8"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M21 12H9"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
