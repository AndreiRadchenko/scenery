import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path, Rect } from 'react-native-svg';

import themes from '../../utils/themes';

export const LikeSvg = ({ isEmpty, handlePress }) => (
  <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.24 11v9H5.63c-.9 0-1.62-.72-1.62-1.61v-5.77c0-.89.73-1.62 1.62-1.62zM18.5 9.5h-4.78V6c0-1.1-.9-2-1.99-2h-.09c-.4 0-.76.24-.92.61L7.99 11v9h9.2c.73 0 1.35-.52 1.48-1.24l1.32-7.5c.16-.92-.54-1.76-1.48-1.76Z"
        fill={isEmpty ? 'none' : themes.primary.colors.accentColor}
        stroke={isEmpty ? themes.primary.colors.lightGrey : 'none'}
      />
    </Svg>
  </TouchableOpacity>
);
