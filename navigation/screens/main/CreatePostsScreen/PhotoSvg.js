import React from 'react';
import Svg, { Path, Rect, ClipPath, Defs, G } from 'react-native-svg';

import themes from '../../../../utils/themes';

export const PhotoSvg = ({ isImageSelected }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <G clip-path="url(#clip0_36_0)">
      <Path
        d="M11.9998 15.2C13.7671 15.2 15.1998 13.7673 15.1998 12C15.1998 10.2327 13.7671 8.79999 11.9998 8.79999C10.2325 8.79999 8.7998 10.2327 8.7998 12C8.7998 13.7673 10.2325 15.2 11.9998 15.2Z"
        fill={
          isImageSelected
            ? themes.primary.colors.backgroundColor
            : themes.primary.colors.lightGrey
        }
      />
      <Path
        d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
        fill={
          isImageSelected
            ? themes.primary.colors.backgroundColor
            : themes.primary.colors.lightGrey
        }
      />
    </G>
    <Defs>
      <ClipPath id="clip0_36_0">
        <Rect
          width="24"
          height="24"
          fill={
            isImageSelected
              ? themes.primary.colors.lightGrey
              : themes.primary.colors.backgroundColor
          }
        />
      </ClipPath>
    </Defs>
  </Svg>
);
