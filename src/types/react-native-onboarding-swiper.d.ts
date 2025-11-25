declare module 'react-native-onboarding-swiper' {
  import { ComponentType, ReactNode } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  interface Page {
    backgroundColor?: string;
    image?: ReactNode;
    title?: string;
    subtitle?: string;
  }

  interface OnboardingProps {
    pages: Page[];
    onSkip?: () => void;
    onDone?: () => void;
    skipLabel?: string;
    nextLabel?: string;
    doneLabel?: string;
    showSkip?: boolean;
    showNext?: boolean;
    showDone?: boolean;
    showPagination?: boolean;
    containerStyles?: ViewStyle;
    imageContainerStyles?: ViewStyle;
    titleStyles?: TextStyle;
    subTitleStyles?: TextStyle;
    bottomBarHighlight?: boolean;
    bottomBarHeight?: number;
  }

  const Onboarding: ComponentType<OnboardingProps>;
  export default Onboarding;
}
