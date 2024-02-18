import Svg, { Path, Circle } from 'react-native-svg';
import themes from '../../../utils/themes';

export const DeleteSvg = ({
  color = themes.primary.colors.backgroundColor,
}) => (
  <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
    <Circle
      cx="12.5"
      cy="12.5"
      r="12"
      // transform="rotate(-45 12.5 12.5)"
      fill={color}
      stroke="#E8E8E8"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
      transform="rotate(-45 12.5 12.5)"
      fill={themes.primary.colors.lightGrey}
    />
  </Svg>
);
