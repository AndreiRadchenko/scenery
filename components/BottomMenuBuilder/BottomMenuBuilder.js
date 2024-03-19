import React from 'react';

import { BottomMenuItem } from './BottomMenuItem';

import * as Styled from './BottomMenuBuilder.styled';

const BottomMenu = ({ menuItems = [] }) => {
  return (
    <Styled.Container>
      {menuItems?.map((e, idx) => (
        <BottomMenuItem {...e} key={idx} />
      ))}
    </Styled.Container>
  );
};

export class BottomMenuBuilder {
  constructor() {
    this.menuItems = [];
  }
  addMenuItem({ ioniconsName, text, handler }) {
    this.menuItems.push({ ioniconsName, text, handler });
    return this;
  }
  build() {
    return BottomMenu({ menuItems: this.menuItems });
  }
}
