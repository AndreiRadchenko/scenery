import { useState, useEffect, useCallback, useRef } from 'react';

import * as Styled from './PasswordInput.styled';
import { pushToPassword } from '../../helpers/pushToPassword';

const PASSWORD_MASK_CHAR = '*';

export const PasswordInput = ({
  maxLength = 31,
  error,
  placeholder = 'Password',
  value,
  onChangeText,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handlePasswordChange = (newPass) => {
    pushToPassword(newPass, value, onChangeText, isPasswordHidden);
  };

  const getHiddenPassword = useCallback(() => {
    const inputTxt = value.substring(0);
    if (!inputTxt) {
      return '';
    }
    if (!isPasswordHidden) {
      return inputTxt;
    }
    return Array(inputTxt.length).fill(PASSWORD_MASK_CHAR).join('');
  }, [value, isPasswordHidden]);

  return (
    <Styled.PasswordWrapper>
      <Styled.Input
        maxLength={maxLength}
        isError={error}
        placeholder={placeholder}
        value={getHiddenPassword()}
        onChangeText={handlePasswordChange}
      />
      <Styled.Error>{error}</Styled.Error>
      <Styled.ShowPassword
        onPress={() => setIsPasswordHidden((prevState) => !prevState)}
      >
        {isPasswordHidden ? 'Show' : 'Hide'}
      </Styled.ShowPassword>
    </Styled.PasswordWrapper>
  );
};
