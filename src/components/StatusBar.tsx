import React from 'react';
import {
  StatusBar as RNStatusBar,
  StatusBarStyle,
  StyleSheet,
} from 'react-native';

interface StatusBarProps {
  bgColor?: string;
  barStyle?: StatusBarStyle;
}

const StatusBar: React.FC<StatusBarProps> = ({bgColor, barStyle}) => {
  const statusBarBgColor = bgColor || '#000';
  const statusBarStyle = barStyle || 'light-content';

  return (
    <RNStatusBar backgroundColor={statusBarBgColor} barStyle={statusBarStyle} />
  );
};

export default StatusBar;

const styles = StyleSheet.create({});
