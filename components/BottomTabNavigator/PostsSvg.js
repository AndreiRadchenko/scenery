import Svg, { Path, Rect } from 'react-native-svg';

export const PostsSvg = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect width="24" height="24" fill="none" />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 3H10V10H3V3Z"
      stroke={color}
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 3H21V10H14V3Z"
      stroke={color}
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 14H21V21H14V14Z"
      stroke={color}
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 14H10V21H3V14Z"
      stroke={color}
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
